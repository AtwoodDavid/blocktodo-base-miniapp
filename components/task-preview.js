import Link from 'next/link'

export function TaskPreview() {
  return (
    <section className="panel">
      <div className="section-heading">
        <p className="eyebrow">Mini App Map</p>
        <h2>More product, less promo page.</h2>
      </div>
      <div className="preview-grid">
        <article className="preview-card">
          <h3>Workbench</h3>
          <p>Create tasks, batch write, revise wording, or toggle completion from a practical writing table.</p>
          <Link className="small-button" href="/workbench">
            Open Workbench
          </Link>
        </article>
        <article className="preview-card ledger">
          <h3>Archive</h3>
          <p>Read the onchain state, inspect content hashes, and check whether your local copy still matches.</p>
          <Link className="small-button" href="/archive">
            Open Archive
          </Link>
        </article>
        <article className="preview-card proof">
          <h3>Proof</h3>
          <p>Keep the deployment, verification, talent, and attribution details in one clean place.</p>
          <Link className="small-button" href="/proof">
            Open Proof
          </Link>
        </article>
      </div>
    </section>
  )
}
