import Link from 'next/link'

export function AboutBoard() {
  return (
    <div className="page-stack about-board">
      <section className="panel about-grid">
        <div>
          <p className="eyebrow">About</p>
          <h2>A retro utility for everyday discipline.</h2>
          <p>
            BlockTodo is intentionally not a glossy crypto dashboard. It borrows from index cards, workshop desks, and
            paper planners so the experience feels calm and useful instead of speculative.
          </p>
        </div>
        <div className="card-stack">
          <div className="note-box">
            <strong>Contract Type</strong>
            <p>Stateful storage contract</p>
          </div>
          <div className="note-box">
            <strong>Best For</strong>
            <p>Routine planning, small-team checklists, and personal task logs with a clear chain footprint.</p>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Builder Notes</p>
          <h2>Technical choices</h2>
        </div>
        <div className="info-grid">
          <article>
            <h3>Wagmi + viem</h3>
            <p>Reads and writes run against Base mainnet using a strict wallet list: Coinbase Wallet and injected only.</p>
          </article>
          <article>
            <h3>ox hashing</h3>
            <p>The app hashes readable task content on-device and compares that against onchain values to verify integrity.</p>
          </article>
          <article>
            <h3>Tracking</h3>
            <p>Successful transactions call the dashboard tracking endpoint while keeping failure silent.</p>
          </article>
        </div>
        <div className="button-row">
          <Link className="stamp-button" href="/proof">Open Proof Page</Link>
          <Link className="ghost-button" href="/workbench">Return to Workbench</Link>
        </div>
      </section>
    </div>
  )
}
