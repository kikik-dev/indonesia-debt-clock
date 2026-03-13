import { predictions } from '../data/eras'
import { useLang } from '../LangContext'

export default function Predictions() {
  const { t } = useLang()

  return (
    <div className="glass-panel">
      <div className="panel-head">
        <h2 className="panel-title">{t.projTitle}</h2>
        <span className="badge-proj">{t.projBadge}</span>
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
            <div className="proj-pdb">{t.projGdp(p.pdb)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
