import { KNOWN_LANGUAGES, LEARNABLE_LANGUAGES } from '../data/languages'
import type { Settings } from '../hooks/useSettings'

interface Props {
  settings: Settings
  onToggleKnown: (code: string) => void
  onSetTarget: (code: string) => void
  onClose: () => void
}

export function LanguageSetup({ settings, onToggleKnown, onSetTarget, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">Language Setup</h2>
          <p className="text-slate-400 mt-1">Tell us what you know and what you want to learn</p>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-lg font-semibold text-slate-200 mb-1">Languages you already know</h3>
            <p className="text-sm text-slate-400 mb-3">We'll use these to show you cognates and connections.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {KNOWN_LANGUAGES.map(lang => {
                const isSelected = settings.knownLanguages.includes(lang.code)
                return (
                  <button
                    key={lang.code}
                    onClick={() => onToggleKnown(lang.code)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                      isSelected
                        ? 'border-transparent text-white'
                        : 'border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                    }`}
                    style={isSelected ? { backgroundColor: lang.color + '33', borderColor: lang.color } : {}}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                    {isSelected && <span className="ml-auto text-xs">✓</span>}
                  </button>
                )
              })}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-slate-200 mb-1">Language you want to learn</h3>
            <p className="text-sm text-slate-400 mb-3">This will be highlighted as your primary focus.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {LEARNABLE_LANGUAGES.map(lang => {
                const isSelected = settings.targetLanguage === lang.code
                return (
                  <button
                    key={lang.code}
                    onClick={() => onSetTarget(lang.code)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                      isSelected
                        ? 'border-transparent text-white'
                        : 'border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                    }`}
                    style={isSelected ? { backgroundColor: lang.color + '44', borderColor: lang.color } : {}}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                    {isSelected && <span className="ml-auto">🎯</span>}
                  </button>
                )
              })}
            </div>
          </section>
        </div>

        <div className="p-6 border-t border-slate-700 flex justify-end">
          <button
            onClick={onClose}
            disabled={settings.knownLanguages.length === 0}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium transition-colors"
          >
            Start Exploring →
          </button>
        </div>
      </div>
    </div>
  )
}
