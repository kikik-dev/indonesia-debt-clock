import { useEffect, useRef, useState } from 'react'

const NUMS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export default function RollingDigit({ digit, cellH = 52, duration = 600 }) {
  const [py, setPy] = useState(() => {
    const n = parseInt(digit, 10)
    return isNaN(n) ? 0 : n * -cellH
  })
  const ready = useRef(false)

  useEffect(() => {
    const n = parseInt(digit, 10)
    if (isNaN(n)) return
    setPy(n * -cellH)
    if (!ready.current) ready.current = true
  }, [digit, cellH])

  if (digit === '.') {
    return <span className="sep">.</span>
  }

  return (
    <div className="dslot" style={{ height: cellH }}>
      <div
        className="dstrip"
        style={{
          transform: `translateY(${py}px)`,
          transition: ready.current
            ? `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`
            : 'none',
        }}
      >
        {NUMS.map((n) => (
          <div key={n} className="dcell" style={{ height: cellH }}>{n}</div>
        ))}
      </div>
    </div>
  )
}
