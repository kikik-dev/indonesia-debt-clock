import { createContext, useContext, useState } from 'react'
import { t } from './data/i18n'

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState('id')
  const toggle = () => setLang((l) => (l === 'id' ? 'en' : 'id'))
  return (
    <LangContext.Provider value={{ lang, toggle, t: t[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
