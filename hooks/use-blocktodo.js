'use client'

import { useEffect, useMemo, useState } from 'react'
import { useAccount, usePublicClient, useReadContract, useSendCalls, useWriteContract } from 'wagmi'
import { readContract, waitForCallsStatus } from '@wagmi/core'
import { base } from 'wagmi/chains'
import { encodeFunctionData } from 'viem'
import { hashTaskContent } from '@/lib/ox'
import {
  blockTodoAbi,
  blockTodoAddress,
  blockTodoAppId,
  blockTodoAppName,
  blockTodoEncodedAttribution,
} from '@/lib/blocktodo'
import { getLocalTasks, removeLocalTask, storeLocalTask } from '@/lib/local-tasks'
import { wagmiConfig } from '@/lib/wagmi'
import { trackTransaction } from '@/utils/track'

async function fetchTasks(address, count) {
  const local = getLocalTasks(address)
  const ids = Array.from({ length: Number(count) }, (_, index) => index)
  const entries = await Promise.all(
    ids.map(async (id) => {
      const result = await readContract(wagmiConfig, {
        address: blockTodoAddress,
        abi: blockTodoAbi,
        functionName: 'getTask',
        args: [address, id],
      })

      const saved = local[String(id)]
      const content = saved?.content || ''
      const contentHash = result[0]
      const createdAt = Number(result[1])
      const computedHash = content ? hashTaskContent(content) : null

      return {
        id,
        content,
        contentHash,
        createdAt,
        createdLabel: createdAt ? new Date(createdAt * 1000).toLocaleString() : 'Unknown',
        completed: result[2],
        deleted: result[3],
        hashMatches: computedHash ? computedHash.toLowerCase() === contentHash.toLowerCase() : false,
      }
    }),
  )

  return entries.reverse()
}

export function useBlockTodo() {
  const { address, isConnected } = useAccount()
  const publicClient = usePublicClient()
  const { sendCallsAsync } = useSendCalls()
  const { writeContractAsync } = useWriteContract()
  const [items, setItems] = useState([])
  const [writeState, setWriteState] = useState({
    pending: false,
    statusMessage: 'Idle',
  })

  const { data: taskCountData, isLoading: taskCountLoading, refetch: refetchCount } = useReadContract({
    address: blockTodoAddress,
    abi: blockTodoAbi,
    functionName: 'getTaskCount',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  })

  const taskCount = useMemo(() => Number(taskCountData || 0), [taskCountData])

  const refresh = async () => {
    if (!address || !isConnected) {
      setItems([])
      return
    }
    const freshCount = await refetchCount()
    const nextCount = Number(freshCount.data || 0)
    const nextItems = await fetchTasks(address, nextCount)
    setItems(nextItems)
  }

  useEffect(() => {
    refresh()
  }, [address, taskCountData])

  const commitWrite = async (config, options = {}) => {
    if (!address || !publicClient) return false

    setWriteState({
      pending: true,
      statusMessage: 'Awaiting wallet confirmation',
    })

    try {
      setWriteState({
        pending: true,
        statusMessage: 'Sending call bundle',
      })

      let transactionHash
      let usedFallback = false

      try {
        const result = await sendCallsAsync({
          account: address,
          chainId: base.id,
          calls: [
            {
              to: blockTodoAddress,
              data: encodeFunctionData({
                abi: blockTodoAbi,
                functionName: config.functionName,
                args: config.args,
              }),
            },
          ],
          capabilities: {
            dataSuffix: {
              value: blockTodoEncodedAttribution,
            },
          },
        })

        setWriteState({
          pending: true,
          statusMessage: 'Waiting for wallet_sendCalls receipt',
        })

        const callsStatus = await waitForCallsStatus(wagmiConfig, {
          id: result.id,
          pollingInterval: 1_000,
          timeout: 120_000,
        })

        transactionHash = callsStatus.receipts?.[0]?.transactionHash
      } catch (sendCallsError) {
        usedFallback = true

        setWriteState({
          pending: true,
          statusMessage: 'sendCalls unavailable, using fallback write',
        })

        transactionHash = await writeContractAsync({
          ...config,
          dataSuffix: blockTodoEncodedAttribution,
        })
      }

      if (!transactionHash) {
        throw new Error('Wallet returned no transaction hash')
      }

      const receipt = await publicClient.waitForTransactionReceipt({ hash: transactionHash })

      if (options.persistTask) {
        storeLocalTask(address, options.persistTask.id, options.persistTask.content)
      }

      if (options.removeTaskId !== undefined) {
        removeLocalTask(address, options.removeTaskId)
      }

      trackTransaction(blockTodoAppId, blockTodoAppName, address, receipt.transactionHash)
      await refresh()

      setWriteState({
        pending: false,
        statusMessage: usedFallback
          ? `Confirmed via fallback: ${receipt.transactionHash.slice(0, 10)}...`
          : `Confirmed via sendCalls: ${receipt.transactionHash.slice(0, 10)}...`,
      })

      return true
    } catch (error) {
      setWriteState({
        pending: false,
        statusMessage: error?.shortMessage || error?.message || 'Transaction failed',
      })
      return false
    }
  }

  const createTask = async (content) => {
    const nextId = taskCount
    return commitWrite(
      {
        address: blockTodoAddress,
        abi: blockTodoAbi,
        functionName: 'createTask',
        args: [content],
      },
      {
        persistTask: { id: nextId, content },
      },
    )
  }

  const batchCreate = async (contents) => {
    const startingId = taskCount
    const ok = await commitWrite({
      address: blockTodoAddress,
      abi: blockTodoAbi,
      functionName: 'batchCreate',
      args: [contents],
    })

    if (ok && address) {
      contents.forEach((content, index) => {
        storeLocalTask(address, startingId + index, content)
      })
      await refresh()
    }

    return ok
  }

  const updateTask = async (id, content) => {
    if (!Number.isInteger(id) || id < 0 || !content.trim()) return false
    return commitWrite(
      {
        address: blockTodoAddress,
        abi: blockTodoAbi,
        functionName: 'updateTask',
        args: [id, content],
      },
      {
        persistTask: { id, content },
      },
    )
  }

  const toggleTask = async (id) => {
    if (!Number.isInteger(id) || id < 0) return false
    return commitWrite({
      address: blockTodoAddress,
      abi: blockTodoAbi,
      functionName: 'toggleTask',
      args: [id],
    })
  }

  const deleteTask = async (id) => {
    if (!Number.isInteger(id) || id < 0) return false
    return commitWrite(
      {
        address: blockTodoAddress,
        abi: blockTodoAbi,
        functionName: 'deleteTask',
        args: [id],
      },
      {
        removeTaskId: id,
      },
    )
  }

  return {
    items,
    taskCount,
    isLoading: taskCountLoading || writeState.pending,
    refresh,
    createTask,
    batchCreate,
    updateTask,
    toggleTask,
    deleteTask,
    writeState,
  }
}
