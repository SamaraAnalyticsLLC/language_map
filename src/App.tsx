import { useState } from 'react'
import { useSettings } from './hooks/useSettings'
import { TranslationProvider, useT } from './hooks/useTranslation'
import { LanguageSetup } from './components/LanguageSetup'
import { WordCard } from './components/WordCard'
import { LanguageMap } from './components/LanguageMap'
import { SettingsPanel } from './components/SettingsPanel'
import { QuizMode } from './components/QuizMode'
import { SemanticMap } from './components/SemanticMap'
import { WORD_ENTRIES, CATEGORIES } from './data/words'
import { LANGUAGES } from './data/languages'

type AppMode = 'explore' | 'quiz' | 'map'

// Outer shell: sets up the translation context
export default function App() {
  const { settings, setUILanguage, toggleKnownLanguage, toggleTargetLanguage, toggleSetting, resetLanguages } = useSettings()
  return (
    <TranslationProvider lang={settings.uiLanguage}>
      <AppInner
        settings={settings}
        setUILanguage={setUILanguage}
        toggleKnownLanguage={toggleKnownLanguage}
        toggleTargetLanguage={toggleTargetLanguage}
        toggleSetting={toggleSetting}
        resetLanguages={resetLanguages}
      />
    </TranslationProvider>
  )
}

type SettingsActions = Omit<ReturnType<typeof useSettings>, 'settings'>

function AppInner({ settings, setUILanguage, toggleKnownLanguage, toggleTargetLanguage, toggleSetting, resetLanguages }: { settings: ReturnType<typeof useSettings>['settings'] } & SettingsActions) {
  const t = useT()
  const [showSetup, setShowSetup] = useState(true)
  const [expandedWord, setExpandedWord] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [appMode, setAppMode] = useState<AppMode>('explore')

  const targetLangs = LANGUAGES.filter(l => settings.targetLanguages.includes(l.code))

  const q = search.toLowerCase().trim()

  const getMatchHint = (w: typeof WORD_ENTRIES[number]): string | null => {
    if (!q) return null
    for (const entry of w.languages) {
      for (const form of entry.forms) {
        if (form.word.toLowerCase().includes(q)) {
          const lang = LANGUAGES.find(l => l.code === entry.langCode)
          return lang ? `${lang.flag} ${lang.name}` : null
        }
      }
      for (const rv of entry.regional ?? []) {
        if (rv.word.toLowerCase().includes(q)) {
          const lang = LANGUAGES.find(l => l.code === entry.langCode)
          return lang ? `${lang.flag} ${lang.name} (regional)` : null
        }
      }
    }
    for (const node of w.etymology) {
      if (node.word.toLowerCase().includes(q)) return `🏛️ Etymology (${node.source})`
    }
    return null
  }

  const filtered = WORD_ENTRIES.filter(w => {
    if (!q && !activeCategory) return true
    const allText = [
      w.concept,
      w.latinRoot ?? '',
      w.protoIndoEuropean ?? '',
      ...w.etymology.map(e => e.word),
      ...w.languages.flatMap(e => [
        ...e.forms.map(f => f.word),
        ...e.forms.map(f => f.ipa ?? ''),
        ...(e.regional ?? []).map(r => r.word),
      ]),
    ]
    const matchesSearch = !q || allText.some(s => s.toLowerCase().includes(q))
    const matchesCategory = !activeCategory || w.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {showSetup && (
        <LanguageSetup
          settings={settings}
          onSetUILanguage={setUILanguage}
          onToggleKnown={toggleKnownLanguage}
          onToggleTarget={toggleTargetLanguage}
          onReset={resetLanguages}
          onClose={() => setShowSetup(false)}
        />
      )}

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          {/* Top row: logo + languages button */}
          <div className="flex items-center gap-2 py-2.5">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-2xl shrink-0">🗺️</span>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-bold leading-none">EtymoMap</h1>
                <p className="text-xs text-slate-500 leading-none mt-0.5 hidden sm:block">{t.app_subtitle}</p>
              </div>
            </div>

            {/* Mode switcher */}
            <div className="flex bg-slate-800/80 rounded-lg p-0.5 text-xs font-medium border border-slate-700/50 shrink-0">
              {([
                { id: 'explore', label: t.mode_explore },
                { id: 'quiz',    label: t.mode_quiz },
                { id: 'map',     label: t.mode_map },
              ] as { id: AppMode; label: string }[]).map(m => (
                <button
                  key={m.id}
                  onClick={() => setAppMode(m.id)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded transition-colors ${
                    appMode === m.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {targetLangs.length > 0 && (
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 rounded-lg text-sm border border-slate-700/50">
                  <span className="hidden md:inline">{t.learning_label}</span>
                  {targetLangs.map(lang => (
                    <span key={lang.code} title={lang.nativeName} className="flex items-center gap-0.5">
                      <span>{lang.flag}</span>
                      {targetLangs.length === 1 && (
                        <span className="font-semibold hidden md:inline" style={{ color: lang.color }}>{lang.nativeName}</span>
                      )}
                    </span>
                  ))}
                </div>
              )}
              <button
                onClick={() => setShowSetup(true)}
                className="px-2.5 sm:px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs sm:text-sm text-slate-300 transition-colors"
              >
                {targetLangs.length > 0
                  ? <span className="sm:hidden">{targetLangs.map(l => l.flag).join('')}</span>
                  : null}
                <span className={targetLangs.length > 0 ? 'hidden sm:inline' : ''}>{t.btn_languages}</span>
              </button>
            </div>
          </div>

          {/* Search row (explore + map modes) */}
          {appMode !== 'quiz' && (
            <div className="pb-2">
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t.search_placeholder}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}
        </div>
      </header>

      {/* Quiz mode */}
      {appMode === 'quiz' && (
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-sm text-slate-400">{t.quiz_pool(filtered.length)}</span>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  !activeCategory ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.all_label}
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <QuizMode words={filtered} settings={settings} />
        </div>
      )}

      {/* Map mode */}
      {appMode === 'map' && (
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex gap-2 mb-3 flex-wrap">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                !activeCategory ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.all_label} ({WORD_ENTRIES.length})
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <SemanticMap words={filtered} settings={settings} />
        </div>
      )}

      {/* Explore mode */}
      {appMode === 'explore' && (
        <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
          <aside className="w-64 shrink-0 space-y-4 hidden lg:block">
            <LanguageMap
              knownLanguages={settings.knownLanguages}
              targetLanguages={settings.targetLanguages}
            />
            <SettingsPanel settings={settings} onToggle={toggleSetting} />
            <div className="bg-slate-900/60 rounded-2xl border border-slate-700/60 p-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">{t.known_langs_sidebar}</h3>
              <div className="space-y-1.5">
                {settings.knownLanguages.map(code => {
                  const lang = LANGUAGES.find(l => l.code === code)
                  if (!lang) return null
                  return (
                    <div key={code} className="flex items-center gap-2 text-sm">
                      <span>{lang.flag}</span>
                      <span className="text-slate-300">{lang.nativeName}</span>
                      <span className="text-xs text-slate-600 ml-auto">{lang.branch}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="flex gap-2 mb-4 flex-wrap">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  !activeCategory ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.all_label} ({WORD_ENTRIES.length})
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
              {t.stats(filtered.length, settings.knownLanguages.length)}
            </div>

            <div className="space-y-2">
              {filtered.map(word => (
                <WordCard
                  key={word.id}
                  word={word}
                  settings={settings}
                  isExpanded={expandedWord === word.id}
                  onToggle={() => setExpandedWord(expandedWord === word.id ? null : word.id)}
                  matchHint={getMatchHint(word)}
                />
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-16 text-slate-500">
                  <div className="text-4xl mb-3">🔍</div>
                  <div>{t.no_results}</div>
                </div>
              )}
            </div>
          </main>
        </div>
      )}
    </div>
  )
}
