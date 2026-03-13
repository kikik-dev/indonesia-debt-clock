import { predictions } from '../data/eras'

export default function Predictions() {
  return (
    <div className="glass-panel">
      <div className="panel-head">
        <h2 className="panel-title">Proyeksi Utang</h2>
        <span className="badge-proj">Estimasi</span>
      </div>
      <div className="proj-grid">
        {predictions.map((p) => (
          <div key={p.year} className="proj-card">
            <div className="proj-year">{p.year}</div>
            <div className="proj-val">Rp {p.val.toLocaleString('id-ID')} T</div>
            <div className="proj-bar-bg">
              <div
                className="proj-bar-fill"
                style={{ width: `${Math.min((p.val / 16000) * 100, 100)}%` }}
              />
            </div>
            <div className="proj-pdb">~{p.pdb}% terhadap PDB</div>
          </div>
        ))}
      </div>
    </div>
  )
}
