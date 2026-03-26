'use client'

import { useMemo, useState } from 'react'
import { useAccount } from 'wagmi'
import { useBlockTodo } from '@/hooks/use-blocktodo'

export function TaskWorkbench() {
  const { address, isConnected } = useAccount()
  const {
    items,
    taskCount,
    isLoading,
    refresh,
    createTask,
    batchCreate,
    toggleTask,
    updateTask,
    deleteTask,
    writeState,
  } = useBlockTodo()
  const [singleContent, setSingleContent] = useState('')
  const [batchContent, setBatchContent] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [updatedContent, setUpdatedContent] = useState('')

  const liveItems = useMemo(() => items.filter((item) => !item.deleted), [items])

  return (
    <div className="page-stack task-workbench">
      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Workbench</p>
          <h2>Practical tools for chain-backed lists.</h2>
        </div>
        <div className="status-line">
          <span className="status-chip">{isConnected ? `Connected: ${address}` : 'Connect a wallet to begin'}</span>
          <span className="status-chip">Onchain count: {taskCount}</span>
          <span className="status-chip">{writeState.statusMessage}</span>
        </div>
      </section>

      <div className="workbench-grid">
        <section className="panel form-stack">
          <div className="section-heading">
            <p className="eyebrow">Create</p>
            <h2>Single Task</h2>
          </div>
          <div className="form-field">
            <label htmlFor="single-task">Task content</label>
            <textarea
              id="single-task"
              placeholder="Mail the sketchbook. Rework copy for Friday. Call the print shop."
              value={singleContent}
              onChange={(event) => setSingleContent(event.target.value)}
            />
          </div>
          <div className="button-row">
            <button
              className="stamp-button"
              disabled={!isConnected || writeState.pending}
              onClick={async () => {
                if (!singleContent.trim()) return
                const ok = await createTask(singleContent.trim())
                if (ok) setSingleContent('')
              }}
            >
              Create Task
            </button>
            <button className="ghost-button" disabled={isLoading} onClick={refresh}>
              Refresh Ledger
            </button>
          </div>
        </section>

        <section className="panel form-stack">
          <div className="section-heading">
            <p className="eyebrow">Batch</p>
            <h2>Multi-Task Drop</h2>
          </div>
          <div className="form-field">
            <label htmlFor="batch-task">One line per task</label>
            <textarea
              id="batch-task"
              placeholder={'Draft release notes\nSort studio invoices\nPack tomorrow orders'}
              value={batchContent}
              onChange={(event) => setBatchContent(event.target.value)}
            />
          </div>
          <button
            className="stamp-button"
            disabled={!isConnected || writeState.pending}
            onClick={async () => {
              const lines = batchContent
                .split('\n')
                .map((item) => item.trim())
                .filter(Boolean)
              if (!lines.length) return
              const ok = await batchCreate(lines)
              if (ok) setBatchContent('')
            }}
          >
            Batch Create
          </button>
        </section>
      </div>

      <div className="workbench-grid">
        <section className="panel form-stack">
          <div className="section-heading">
            <p className="eyebrow">Edit</p>
            <h2>Update Existing Task</h2>
          </div>
          <div className="form-field">
            <label htmlFor="task-id">Task id</label>
            <input id="task-id" value={selectedId} onChange={(event) => setSelectedId(event.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="updated-copy">New content</label>
            <textarea
              id="updated-copy"
              value={updatedContent}
              onChange={(event) => setUpdatedContent(event.target.value)}
            />
          </div>
          <div className="button-row">
            <button
              className="stamp-button"
              disabled={!isConnected || writeState.pending}
              onClick={() => updateTask(Number(selectedId), updatedContent)}
            >
              Update Task
            </button>
            <button
              className="small-button"
              disabled={!isConnected || writeState.pending}
              onClick={() => toggleTask(Number(selectedId))}
            >
              Toggle Complete
            </button>
            <button
              className="ghost-button"
              disabled={!isConnected || writeState.pending}
              onClick={() => deleteTask(Number(selectedId))}
            >
              Soft Delete
            </button>
          </div>
        </section>

        <section className="panel card-stack">
          <div className="section-heading">
            <p className="eyebrow">Live List</p>
            <h2>Open Tasks</h2>
          </div>
          {liveItems.length ? (
            <div className="card-stack">
              {liveItems.slice(0, 4).map((item) => (
                <article className="task-card" key={item.id}>
                  <header>
                    <strong>Task #{item.id}</strong>
                    <span className="badge">{item.completed ? 'Completed' : 'Open'}</span>
                  </header>
                  <p>{item.content || 'No local content saved on this device.'}</p>
                  <p className="tiny">Verified with ox: {item.hashMatches ? 'yes' : 'no'}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">No open tasks yet. Create your first chain-backed note.</div>
          )}
        </section>
      </div>
    </div>
  )
}
