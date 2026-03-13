import { useState } from 'react'
import { eras } from '../data/eras'
import { useLang } from '../LangContext'

function fmtDebt(d) {
  if (d < 1) return 'Rp 794 M'
  return 'Rp ' + d.toLocaleString('id-ID') + ' T'
}

export default function Timeline() {
  const { t } = useLang()
  const [active, setActive] = useState(null)
  const maxDebt = Math.max(...eras.map((e) => e.debt))

  return (
    <div className="glass-panel">
      <div className="panel-head">
        <h2 className="panel-title">{t.timelineTitle}</h2>
        <span className="panel-sub">{t.timelineSub(eras.length)}</span>
      </div>
      <div className="tl">
        {eras.map((e, i) => {
          const pct = Math.max((e.debt / maxDebt) * 100, 2)
          return (
            <div
              key={i}
              className={`tl-row${active === i ? ' tl-active' : ''}`}
              onClick={() => setActive(active === i ? null : i)}
            >
              <div className="tl-color" style={{ background: e.color }} />
              <div className="tl-body">
                <div className="tl-top">
                  <span className="tl-name">{e.name}</span>
                  <span className="tl-debt">{fmtDebt(e.debt)}</span>
                </div>
                <div className="tl-bar-bg">
                  <div className="tl-bar-fill" style={{ width: pct + '%', background: e.color }} />
                </div>
                <div className="tl-bottom">
                  <span className="tl-period">{e.period}</span>
                  <span className="tl-pdb">{e.pdb != null ? e.pdb + t.gdpLabel : '~38' + t.gdpLabel}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
