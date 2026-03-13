import { highlights } from '../data/eras'
import { useLang } from '../LangContext'

const icons = ['\u2197', '\u26A0', '\u2198']

export default function Metrics() {
  const { t } = useLang()

  const labels = [t.highestIncrease, t.highestGdp, t.lowestGdp]

  return (
    <div className="cards">
      {highlights.map((h, i) => (
        <div key={i} className="card">
          <div className="card-icon">{icons[i]}</div>
          <div className="card-label">{labels[i]}</div>
          <div className="card-value">{h.value}</div>
          <div className="card-sub">{h.sub}</div>
        </div>
      ))}
    </div>
  )
}
