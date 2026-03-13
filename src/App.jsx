import DebtTicker from './components/DebtTicker'
import Metrics from './components/Metrics'
import DebtChart from './components/DebtChart'
import Timeline from './components/Timeline'
import Predictions from './components/Predictions'

import './index.css'

export default function App() {
  return (
    <div className="app">
      <div className="bg-grid" />


      <DebtTicker />

      <main className="content">
        <Metrics />
        <DebtChart />
        <Timeline />
        <Predictions />

        <footer className="foot">
          <p>
            * Proyeksi menggunakan rata-rata kenaikan tahunan 3 tahun terakhir
            &plusmn;12&ndash;15% per tahun. Angka proyeksi bersifat indikatif.
            Utang era Soekarno dikonversi ke nilai nominal.
            Data per Mei 2024 untuk Jokowi dan Desember 2025 untuk Prabowo.
          </p>
          <p className="foot-credit">
            Indonesia Debt Clock &middot; Data bersifat edukatif
          </p>
        </footer>
      </main>
    </div>
  )
}
