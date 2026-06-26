import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { getT, type T, type UILang } from '../data/translations'

const TranslationContext = createContext<T>(getT('en'))

export function TranslationProvider({ lang, children }: { lang: UILang; children: ReactNode }) {
  return (
    <TranslationContext.Provider value={getT(lang)}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useT(): T {
  return useContext(TranslationContext)
}
