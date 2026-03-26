import Link from 'next/link'

export function HeroBoard() {
  return (
    <section className="hero-board">
      <div className="panel hero-copy">
        <p className="eyebrow">Productivity App / Utility App</p>
        <h1>A little chain-backed notebook for serious lists.</h1>
        <p>
          BlockTodo turns everyday task keeping into a warm, trackable Base mini app. It is built for small rituals:
          jot, revise, finish, archive.
        </p>
        <div className="button-row">
          <Link className="stamp-button" href="/workbench">
            Start Writing
          </Link>
          <Link className="ghost-button" href="/archive">
            View Archive
          </Link>
        </div>
        <div className="hero-notes">
          <div className="note-box">
            <strong>Contract</strong>
            <p className="mono">0x5b86cdc0d63bc70664eb3a508448bf1f4b1fadd6</p>
          </div>
          <div className="note-box">
            <strong>Promise</strong>
            <p>Readable content stays with the user while the app checks its onchain hash for trust.</p>
          </div>
        </div>
      </div>
      <aside className="ticket">
        <div className="ticket-strip">
          <span>Base Mainnet</span>
          <span>English UI</span>
          <span>Mobile Ready</span>
        </div>
        <div className="ticket-ledger">
          <div className="ledger-row">
            <strong>Pages</strong>
            <span>Desk, Workbench, Archive, Proof</span>
          </div>
          <div className="ledger-row">
            <strong>Wallets</strong>
            <span>Coinbase Wallet + Injected</span>
          </div>
          <div className="ledger-row">
            <strong>Tracking</strong>
            <span>Dashboard API + ERC-8021 ready</span>
          </div>
          <div className="ledger-row">
            <strong>Style</strong>
            <span>American vintage stationery</span>
          </div>
        </div>
      </aside>
    </section>
  )
}
