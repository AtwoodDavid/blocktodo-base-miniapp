import Link from 'next/link'
import { HeroBoard } from '@/components/hero-board'
import { TaskPreview } from '@/components/task-preview'

export default function HomePage() {
  return (
    <div className="page-stack">
      <HeroBoard />
      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">How It Works</p>
          <h2>Write it down, stamp it on Base, keep it close.</h2>
        </div>
        <div className="info-grid">
          <article>
            <h3>Chain-backed notes</h3>
            <p>Every create, update, toggle, and delete action writes through the BlockTodoPro contract on Base.</p>
          </article>
          <article>
            <h3>Private by design</h3>
            <p>The contract stores a hash of each task. The app keeps your readable copy locally and verifies it with ox.</p>
          </article>
          <article>
            <h3>Built for motion</h3>
            <p>Use the bottom tab bar to move between your desk, archive, and proof pages without a promo-style homepage.</p>
          </article>
        </div>
      </section>
      <TaskPreview />
      <section className="panel split-callout">
        <div>
          <p className="eyebrow">Start Here</p>
          <h2>Take the workshop path.</h2>
          <p>Connect with Coinbase Wallet or an injected wallet, then create and manage your task list from the Workbench page.</p>
        </div>
        <Link className="stamp-button" href="/workbench">
          Enter Workbench
        </Link>
      </section>
    </div>
  )
}
