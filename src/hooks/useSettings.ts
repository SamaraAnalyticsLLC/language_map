import { useState, useEffect } from 'react'

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

const STORAGE_KEY = 'etymomap-settings'

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS
    const parsed = JSON.parse(raw) as Partial<Settings>
    // Merge with defaults so new keys added in future releases still appear
    return { ...DEFAULT_SETTINGS, ...parsed }
  } catch {
    return DEFAULT_SETTINGS
  }
}

function saveSettings(s: Settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  } catch {
    // storage might be unavailable (private browsing etc.)
  }
}

export function useSettings() {
  const [settings, setSettingsRaw] = useState<Settings>(loadSettings)

  const setSettings = (updater: (s: Settings) => Settings) => {
    setSettingsRaw(prev => {
      const next = updater(prev)
      saveSettings(next)
      return next
    })
  }

  // Sync on first load in case the stored value is newer than the in-memory default
  useEffect(() => {
    const stored = loadSettings()
    setSettingsRaw(stored)
  }, [])

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
