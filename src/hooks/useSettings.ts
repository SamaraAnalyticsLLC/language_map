import { useState } from 'react'

export interface Settings {
  knownLanguages: string[]
  targetLanguage: string
  showEtymology: boolean
  showContext: boolean
  showRegional: boolean
  showIPA: boolean
  showFunFact: boolean
  showFalseFriends: boolean
}

const DEFAULT_SETTINGS: Settings = {
  knownLanguages: ['en'],
  targetLanguage: 'it',
  showEtymology: true,
  showContext: true,
  showRegional: true,
  showIPA: true,
  showFunFact: true,
  showFalseFriends: true,
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)

  const toggleKnownLanguage = (code: string) => {
    setSettings(s => ({
      ...s,
      knownLanguages: s.knownLanguages.includes(code)
        ? s.knownLanguages.filter(l => l !== code)
        : [...s.knownLanguages, code],
    }))
  }

  const setTargetLanguage = (code: string) => {
    setSettings(s => ({ ...s, targetLanguage: code }))
  }

  const toggleSetting = (key: keyof Omit<Settings, 'knownLanguages' | 'targetLanguage'>) => {
    setSettings(s => ({ ...s, [key]: !s[key] }))
  }

  return { settings, toggleKnownLanguage, setTargetLanguage, toggleSetting }
}
