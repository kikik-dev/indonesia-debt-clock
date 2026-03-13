import { LangProvider, useLang } from './LangContext'
import DebtTicker from './components/DebtTicker'
import Metrics from './components/Metrics'
import DebtChart from './components/DebtChart'
import Timeline from './components/Timeline'
import Predictions from './components/Predictions'
import './index.css'

function LangToggle() {
  const { lang, toggle } = useLang()
  return (
    <button className="lang-toggle" onClick={toggle} aria-label="Switch language">
      <span className={lang === 'id' ? 'lang-active' : ''}>ID</span>
      <span className="lang-sep">/</span>
      <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
    </button>
  )
}

function Inner() {
  const { t } = useLang()
  return (
    <div className="app">
      <div className="bg-grid" />
      <LangToggle />

      <DebtTicker />

      <main className="content">
        <Metrics />
        <DebtChart />
        <Timeline />
        <Predictions />

        <footer className="foot">
          <p>{t.footnote}</p>
          <p className="foot-credit">{t.credit}</p>
        </footer>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Inner />
    </LangProvider>
  )
}
