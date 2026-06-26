import type { Settings } from '../hooks/useSettings'

interface ToggleOption {
  key: keyof Omit<Settings, 'knownLanguages' | 'targetLanguage'>
  label: string
  description: string
  emoji: string
}

const TOGGLES: ToggleOption[] = [
  { key: 'showEtymology', label: 'Etymology', description: 'Show Latin roots & word history', emoji: '🏛️' },
  { key: 'showContext', label: 'Context', description: 'Show usage context & register', emoji: '💬' },
  { key: 'showRegional', label: 'Regional variants', description: 'Show differences between regions', emoji: '🗺️' },
  { key: 'showIPA', label: 'Pronunciation (IPA)', description: 'Show phonetic transcriptions', emoji: '🔊' },
  { key: 'showFunFact', label: 'Fun facts', description: 'Show linguistic trivia', emoji: '💡' },
  { key: 'showFalseFriends', label: 'False friends', description: 'Highlight deceptive cognates', emoji: '⚠️' },
]

interface Props {
  settings: Settings
  onToggle: (key: keyof Omit<Settings, 'knownLanguages' | 'targetLanguage'>) => void
}

export function SettingsPanel({ settings, onToggle }: Props) {
  return (
    <div className="bg-slate-900/60 rounded-2xl border border-slate-700/60 p-4">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Display Options</h3>
      <div className="space-y-2">
        {TOGGLES.map(toggle => (
          <button
            key={toggle.key}
            onClick={() => onToggle(toggle.key)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left ${
              settings[toggle.key]
                ? 'bg-indigo-600/20 border border-indigo-600/40'
                : 'bg-slate-800/50 border border-slate-700/50 opacity-60'
            }`}
          >
            <span className="text-base shrink-0">{toggle.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-200">{toggle.label}</div>
              <div className="text-xs text-slate-500 truncate">{toggle.description}</div>
            </div>
            <div
              className={`shrink-0 w-8 h-4 rounded-full transition-all relative ${
                settings[toggle.key] ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${
                  settings[toggle.key] ? 'left-4' : 'left-0.5'
                }`}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
