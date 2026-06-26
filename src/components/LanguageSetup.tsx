import { useState } from 'react'
import { KNOWN_LANGUAGES, LEARNABLE_LANGUAGES } from '../data/languages'
import { TRANSLATIONS, type UILang } from '../data/translations'
import { useT } from '../hooks/useTranslation'
import type { Settings } from '../hooks/useSettings'

// Language codes that have a UI translation
const UI_LANGS: UILang[] = ['en', 'es', 'pt', 'fr', 'it', 'de', 'nl', 'ro', 'ca']

interface Props {
  settings: Settings
  onSetUILanguage: (code: UILang) => void
  onToggleKnown: (code: string) => void
  onToggleTarget: (code: string) => void
  onReset: () => void
  onClose: () => void
}

export function LanguageSetup({ settings, onSetUILanguage, onToggleKnown, onToggleTarget, onReset, onClose }: Props) {
  const [step, setStep] = useState(0)
  const t = useT()

  const canClose = settings.targetLanguages.length > 0

  const handleReset = () => {
    onReset()
    setStep(0)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

        {/* Step 0 — UI language */}
        {step === 0 && (
          <>
            <div className="p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white">{t.welcome}</h2>
              <p className="text-slate-400 mt-1">{t.welcome_sub}</p>
            </div>
            <div className="p-6">
              <p className="text-sm font-medium text-slate-300 mb-4">{t.ui_lang_prompt}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {UI_LANGS.map(code => {
                  const lang = KNOWN_LANGUAGES.find(l => l.code === code)
                  if (!lang) return null
                  const isSelected = settings.uiLanguage === code
                  const nativeT = TRANSLATIONS[code]
                  return (
                    <button
                      key={code}
                      onClick={() => onSetUILanguage(code)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                        isSelected
                          ? 'border-transparent text-white'
                          : 'border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                      }`}
                      style={isSelected ? { backgroundColor: lang.color + '33', borderColor: lang.color } : {}}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                      {isSelected && (
                        <span className="ml-auto text-xs opacity-70">{nativeT.btn_continue.replace(' →', '')}</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="p-6 border-t border-slate-700 flex justify-between items-center">
              {(settings.knownLanguages.length > 0 || settings.targetLanguages.length > 0) ? (
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-600 hover:text-red-400 transition-colors"
                >
                  ↺ Reset all
                </button>
              ) : <span />}
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors"
              >
                {t.btn_continue}
              </button>
            </div>
          </>
        )}

        {/* Step 1 — Known languages */}
        {step === 1 && (
          <>
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-slate-500 uppercase tracking-wide">1 / 2</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{t.known_title}</h2>
              <p className="text-slate-400 mt-1">{t.known_sub}</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {KNOWN_LANGUAGES.map(lang => {
                  const isSelected = settings.knownLanguages.includes(lang.code)
                  const isTarget = settings.targetLanguages.includes(lang.code)
                  return (
                    <button
                      key={lang.code}
                      onClick={() => !isTarget && onToggleKnown(lang.code)}
                      disabled={isTarget}
                      title={isTarget ? t.target_title : undefined}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                        isTarget
                          ? 'border-slate-700 text-slate-600 cursor-not-allowed opacity-40'
                          : isSelected
                            ? 'border-transparent text-white'
                            : 'border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                      }`}
                      style={isSelected && !isTarget ? { backgroundColor: lang.color + '33', borderColor: lang.color } : {}}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                      {isSelected && !isTarget && <span className="ml-auto text-xs">✓</span>}
                      {isTarget && <span className="ml-auto text-xs">🎯</span>}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="p-6 border-t border-slate-700 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setStep(0)}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 transition-colors text-sm"
                >
                  {t.btn_back}
                </button>
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-600 hover:text-red-400 transition-colors"
                >
                  ↺ Reset all
                </button>
              </div>
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors"
              >
                {t.btn_continue}
              </button>
            </div>
          </>
        )}

        {/* Step 2 — Target languages (multi-select) */}
        {step === 2 && (
          <>
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-slate-500 uppercase tracking-wide">2 / 2</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{t.target_title}</h2>
              <p className="text-slate-400 mt-1">{t.target_sub}</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {LEARNABLE_LANGUAGES.map(lang => {
                  const isSelected = settings.targetLanguages.includes(lang.code)
                  const isKnown = settings.knownLanguages.includes(lang.code)
                  const isLastTarget = isSelected && settings.targetLanguages.length === 1
                  return (
                    <button
                      key={lang.code}
                      onClick={() => !isKnown && onToggleTarget(lang.code)}
                      disabled={isKnown || isLastTarget}
                      title={isKnown ? t.known_title : isLastTarget ? 'At least one target required' : undefined}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                        isKnown
                          ? 'border-slate-700 text-slate-600 cursor-not-allowed opacity-40'
                          : isSelected
                            ? 'border-transparent text-white'
                            : 'border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                      }`}
                      style={isSelected && !isKnown ? { backgroundColor: lang.color + '44', borderColor: lang.color } : {}}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                      {isSelected && !isKnown && <span className="ml-auto">🎯</span>}
                      {isKnown && <span className="ml-auto text-xs">✓</span>}
                    </button>
                  )
                })}
              </div>
              {settings.targetLanguages.length > 1 && (
                <p className="text-xs text-indigo-400 mt-3 text-center">
                  {settings.targetLanguages.length} languages selected
                </p>
              )}
            </div>
            <div className="p-6 border-t border-slate-700 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 transition-colors text-sm"
                >
                  {t.btn_back}
                </button>
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-600 hover:text-red-400 transition-colors"
                >
                  ↺ Reset all
                </button>
              </div>
              <button
                onClick={onClose}
                disabled={!canClose}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium transition-colors"
              >
                {t.btn_start}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
