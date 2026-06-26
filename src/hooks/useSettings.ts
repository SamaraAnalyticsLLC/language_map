import { useState, useEffect } from 'react'
import type { UILang } from '../data/translations'

export interface Settings {
  uiLanguage: UILang
  knownLanguages: string[]
  targetLanguages: string[]
  showEtymology: boolean
  showContext: boolean
  showRegional: boolean
  showIPA: boolean
  showFunFact: boolean
  showFalseFriends: boolean
}

const DEFAULT_SETTINGS: Settings = {
  uiLanguage: 'en',
  knownLanguages: [],
  targetLanguages: [],
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
    const parsed = JSON.parse(raw) as Record<string, unknown>
    // Migrate old single targetLanguage to array
    if (typeof parsed.targetLanguage === 'string' && !parsed.targetLanguages) {
      parsed.targetLanguages = [parsed.targetLanguage]
    }
    return { ...DEFAULT_SETTINGS, ...parsed } as Settings
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
      // Cannot add a language that is already a target
      if (s.targetLanguages.includes(code)) return s
      return {
        ...s,
        knownLanguages: s.knownLanguages.includes(code)
          ? s.knownLanguages.filter(l => l !== code)
          : [...s.knownLanguages, code],
      }
    })
  }

  const toggleTargetLanguage = (code: string) => {
    setSettings(s => {
      // Cannot target a known language
      if (s.knownLanguages.includes(code)) return s
      const isCurrentlyTarget = s.targetLanguages.includes(code)
      // Must keep at least one target
      if (isCurrentlyTarget && s.targetLanguages.length === 1) return s
      return {
        ...s,
        targetLanguages: isCurrentlyTarget
          ? s.targetLanguages.filter(l => l !== code)
          : [...s.targetLanguages, code],
      }
    })
  }

  const toggleSetting = (key: keyof Omit<Settings, 'uiLanguage' | 'knownLanguages' | 'targetLanguages'>) => {
    setSettings(s => ({ ...s, [key]: !s[key] }))
  }

  const resetLanguages = () => {
    setSettings(s => ({ ...s, knownLanguages: [], targetLanguages: [] }))
  }

  return { settings, setUILanguage, toggleKnownLanguage, toggleTargetLanguage, toggleSetting, resetLanguages }
}
