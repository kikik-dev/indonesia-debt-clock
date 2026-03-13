import { highlights } from '../data/eras'

const icons = ['trending_up', 'speed', 'trending_down']

export default function Metrics() {
  return (
    <div className="cards">
      {highlights.map((h, i) => (
        <div key={i} className="card">
          <div className="card-icon">{icons[i] === 'trending_up' ? '\u2197' : icons[i] === 'speed' ? '\u26A0' : '\u2198'}</div>
          <div className="card-label">{h.label}</div>
          <div className="card-value">{h.value}</div>
          <div className="card-sub">{h.sub}</div>
        </div>
      ))}
    </div>
  )
}
