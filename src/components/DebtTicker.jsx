import { useEffect, useState, useCallback, useRef } from 'react'
import RollingDigit from './RollingDigit'

const POPULATION = 278_800_000

function trillionToFullDigits(t) {
  const intPart = Math.floor(t)
  const fracPart = t - intPart
  const fracDigits = Math.floor(fracPart * 1e12)
    .toString()
    .padStart(12, '0')
  const full = String(intPart) + fracDigits

  let out = ''
  let c = 0
  for (let i = full.length - 1; i >= 0; i--) {
    out = full[i] + out
    c++
    if (c % 3 === 0 && i !== 0) out = '.' + out
  }
  return out
}

function fmtRupiah(v) {
  return 'Rp ' + Math.round(v).toLocaleString('id-ID')
}

export default function DebtTicker() {
  const [debt, setDebt] = useState(null)
  const [cfg, setCfg] = useState(null)
  const frameRef = useRef(null)

  useEffect(() => {
    fetch('./debt-data.json')
      .then((r) => r.json())
      .then(setCfg)
  }, [])

  const calc = useCallback(() => {
    if (!cfg) return null
    const sec = (Date.now() - new Date(cfg.start_time).getTime()) / 1000
    return cfg.base_debt_trillion + sec * cfg.increase_per_second_trillion
  }, [cfg])

  useEffect(() => {
    if (!cfg) return
    setDebt(calc())
    const id = setInterval(() => setDebt(calc()), 1000)
    return () => clearInterval(id)
  }, [cfg, calc])

  useEffect(() => {
    if (debt === null) return
    const perCapita = (debt * 1e12) / POPULATION
    const el = document.getElementById('percap')
    if (!el) return
    let cur = parseFloat(el.dataset.cur || '0')
    const target = perCapita
    const step = () => {
      cur += (target - cur) * 0.12
      if (Math.abs(target - cur) < 1) cur = target
      el.textContent = fmtRupiah(cur)
      el.dataset.cur = String(cur)
      if (cur !== target) frameRef.current = requestAnimationFrame(step)
    }
    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
  }, [debt])

  if (debt === null) {
    return (
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-loading">Memuat data utang...</div>
        </div>
      </section>
    )
  }

  const fullStr = trillionToFullDigits(debt)
  const chars = fullStr.split('')
  const rasio = ((debt / 23800) * 100).toFixed(2)

  return (
    <section className="hero">
      <div className="hero-glow" />
      <div className="hero-glow hero-glow-2" />
      <div className="hero-inner">
        <div className="hero-badge">
          <span className="live-dot" />
          LIVE &mdash; Utang Pemerintah Indonesia
        </div>

        <div className="counter-block">
          <div className="counter-label">Rp</div>
          <div className="counter-digits">
            {chars.map((ch, i) => (
              <RollingDigit key={i} digit={ch} />
            ))}
          </div>
        </div>

        <p className="counter-caption">
          Bertambah &plusmn;Rp 39,7 miliar setiap detik
        </p>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-val">{rasio}%</span>
            <span className="hero-stat-lbl">Rasio PDB</span>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <span className="hero-stat-val" id="percap" data-cur="0">Rp 0</span>
            <span className="hero-stat-lbl">Utang per Kapita</span>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <span className="hero-stat-val">Prabowo</span>
            <span className="hero-stat-lbl">Era saat ini</span>
          </div>
        </div>

        <div className="scroll-hint">
          <span>Scroll untuk detail</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </div>
    </section>
  )
}
