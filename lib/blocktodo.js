export const blockTodoAddress = '0x5b86cdc0d63bc70664eb3a508448bf1f4b1fadd6'
export const blockTodoAppId = '69c4fe91875674902db2b29d'
export const blockTodoAppName = 'BlockTodo'
export const blockTodoBuilderCode = 'bc_xm0laymr'
export const blockTodoEncodedAttribution = '0x62635f786d306c61796d720b0080218021802180218021802180218021'

export const blockTodoAbi = [
  { type: 'function', name: 'createTask', stateMutability: 'nonpayable', inputs: [{ name: 'content', type: 'string' }], outputs: [] },
  { type: 'function', name: 'batchCreate', stateMutability: 'nonpayable', inputs: [{ name: 'contents', type: 'string[]' }], outputs: [] },
  { type: 'function', name: 'toggleTask', stateMutability: 'nonpayable', inputs: [{ name: 'id', type: 'uint32' }], outputs: [] },
  {
    type: 'function',
    name: 'updateTask',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'id', type: 'uint32' },
      { name: 'newContent', type: 'string' },
    ],
    outputs: [],
  },
  { type: 'function', name: 'deleteTask', stateMutability: 'nonpayable', inputs: [{ name: 'id', type: 'uint32' }], outputs: [] },
  {
    type: 'function',
    name: 'getTask',
    stateMutability: 'view',
    inputs: [
      { name: 'user', type: 'address' },
      { name: 'id', type: 'uint32' },
    ],
    outputs: [
      { name: 'contentHash', type: 'bytes32' },
      { name: 'createdAt', type: 'uint32' },
      { name: 'completed', type: 'bool' },
      { name: 'deleted', type: 'bool' },
    ],
  },
  {
    type: 'function',
    name: 'getTaskCount',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [{ name: '', type: 'uint32' }],
  },
]
