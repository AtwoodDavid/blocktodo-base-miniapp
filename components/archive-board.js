'use client'

import { useState } from 'react'
import { useBlockTodo } from '@/hooks/use-blocktodo'

export function ArchiveBoard() {
  const { items, taskCount, isLoading, refresh, toggleTask, deleteTask } = useBlockTodo()
  const [filter, setFilter] = useState('all')

  const filteredItems = items.filter((item) => {
    if (filter === 'open') return !item.completed && !item.deleted
    if (filter === 'done') return item.completed && !item.deleted
    if (filter === 'deleted') return item.deleted
    return true
  })

  return (
    <div className="page-stack archive-board">
      <section className="panel archive-grid">
        <div>
          <p className="eyebrow">Archive</p>
          <h2>Read what the chain remembers.</h2>
          <p>
            The contract stores content hashes rather than raw strings. BlockTodo compares your local note copy against
            the onchain hash so you can tell whether this device still holds the matching task text.
          </p>
        </div>
        <div className="card-stack">
          <span className="status-chip">Task slots: {taskCount}</span>
          <span className="status-chip">{isLoading ? 'Loading chain data...' : 'Chain data ready'}</span>
          <div className="button-row">
            <button className="small-button" onClick={() => setFilter('all')}>All</button>
            <button className="small-button" onClick={() => setFilter('open')}>Open</button>
            <button className="small-button" onClick={() => setFilter('done')}>Done</button>
            <button className="small-button" onClick={() => setFilter('deleted')}>Deleted</button>
            <button className="ghost-button" onClick={refresh}>Refresh</button>
          </div>
        </div>
      </section>

      <section className="panel">
        {filteredItems.length ? (
          <div className="task-grid">
            {filteredItems.map((item) => (
              <article className="task-card" key={item.id}>
                <header>
                  <strong>Task #{item.id}</strong>
                  <span className="badge">{item.deleted ? 'Deleted' : item.completed ? 'Completed' : 'Open'}</span>
                </header>
                <p>{item.content || 'No local content on this browser yet.'}</p>
                <p className="tiny">Created: {item.createdLabel}</p>
                <p className="tiny">Hash match: {item.hashMatches ? 'Verified' : 'Mismatch / unknown'}</p>
                <p className="hash-line tiny">{item.contentHash}</p>
                {!item.deleted ? (
                  <div className="task-actions">
                    <button className="small-button" onClick={() => toggleTask(item.id)}>Toggle</button>
                    <button className="ghost-button" onClick={() => deleteTask(item.id)}>Delete</button>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">Nothing matches this filter yet.</div>
        )}
      </section>
    </div>
  )
}
