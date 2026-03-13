import { useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { eras } from '../data/eras'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

export default function DebtChart() {
  const data = useMemo(() => ({
    labels: eras.map((e) => e.name.split(' ')[0]),
    datasets: [{
      data: eras.map((e) => (e.debt < 1 ? 0.8 : e.debt)),
      backgroundColor: eras.map((e) => e.color + 'CC'),
      hoverBackgroundColor: eras.map((e) => e.color),
      borderRadius: 6,
      borderSkipped: false,
    }],
  }), [])

  const opts = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 800, easing: 'easeOutQuart' },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#111',
        bodyColor: '#444',
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: (ctx) => {
            const v = ctx.raw
            if (v < 1) return 'Rp 794 Miliar'
            return 'Rp ' + v.toLocaleString('id-ID', { minimumFractionDigits: 0 }) + ' Triliun'
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { font: { size: 11, family: 'Inter' }, color: 'rgba(0,0,0,0.45)' },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.06)' },
        border: { display: false },
        ticks: {
          font: { size: 11, family: 'Inter' },
          color: 'rgba(0,0,0,0.35)',
          callback: (v) => (v >= 1000 ? (v / 1000).toFixed(0) + 'rb T' : v + ' T'),
        },
      },
    },
  }), [])

  return (
    <div className="glass-panel">
      <div className="panel-head">
        <h2 className="panel-title">Tren Utang per Era</h2>
        <span className="panel-sub">Dalam Rp Triliun</span>
      </div>
      <div className="chart-area">
        <Bar data={data} options={opts} />
      </div>
    </div>
  )
}
