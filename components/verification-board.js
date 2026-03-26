export function VerificationBoard() {
  return (
    <div className="page-stack verification-board">
      <section className="panel proof-grid">
        <div>
          <p className="eyebrow">Proof</p>
          <h2>Verification details kept in plain sight.</h2>
          <p>
            This page is intended to serve as the stable verification URL for listings and review flows. The required
            Base and Talent meta tags are hardcoded in the document head, not injected with the metadata API.
          </p>
        </div>
        <div className="card-stack">
          <div className="note-box">
            <strong>Formal URL</strong>
            <p className="mono">https://blocktodo-base-miniapp.vercel.app/proof</p>
          </div>
          <div className="note-box">
            <strong>App ID</strong>
            <p className="mono">69c4fe91875674902db2b29d</p>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">What Is Included</p>
          <h2>Metadata and attribution readiness</h2>
        </div>
        <div className="info-grid">
          <article>
            <h3>Base.dev tags</h3>
            <p>The required Base app id is embedded directly in the head for every page render.</p>
          </article>
          <article>
            <h3>Talent proof</h3>
            <p>The provided Talent verification tag is also hardcoded globally, making this route usable as the talent URL.</p>
          </article>
          <article>
            <h3>8021 ready</h3>
            <p>Transactions are prepared with an ERC-8021 data suffix helper via ox. Once you send the registered builder code, we can finalize the exact attribution string.</p>
          </article>
        </div>
        <p className="footer-note">Current app tracking id in the dashboard call is <span className="mono">app-001</span>.</p>
      </section>
    </div>
  )
}
