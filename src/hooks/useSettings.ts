import { useState, useEffect } from 'react'
import type { UILang } from '../data/translations'

export interface Settings {
  uiLanguage: UILang
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
  uiLanguage: 'en',
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

  useEffect(() => {
    const stored = loadSettings()
    setSettingsRaw(stored)
  }, [])

  const setUILanguage = (code: UILang) => {
    setSettings(s => ({ ...s, uiLanguage: code }))
  }

  const toggleKnownLanguage = (code: string) => {
    setSettings(s => {
      // Cannot add a language that is already the target
      if (code === s.targetLanguage) return s
      return {
        ...s,
        knownLanguages: s.knownLanguages.includes(code)
          ? s.knownLanguages.filter(l => l !== code)
          : [...s.knownLanguages, code],
      }
    })
  }

  const setTargetLanguage = (code: string) => {
    setSettings(s => ({
      ...s,
      targetLanguage: code,
      // Remove from known if it was there
      knownLanguages: s.knownLanguages.filter(l => l !== code),
    }))
  }

  const toggleSetting = (key: keyof Omit<Settings, 'uiLanguage' | 'knownLanguages' | 'targetLanguage'>) => {
    setSettings(s => ({ ...s, [key]: !s[key] }))
  }

  return { settings, setUILanguage, toggleKnownLanguage, setTargetLanguage, toggleSetting }
}
