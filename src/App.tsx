import { useState } from 'react'
import { useSettings } from './hooks/useSettings'
import { LanguageSetup } from './components/LanguageSetup'
import { WordCard } from './components/WordCard'
import { LanguageMap } from './components/LanguageMap'
import { SettingsPanel } from './components/SettingsPanel'
import { WORD_ENTRIES, CATEGORIES } from './data/words'
import { LANGUAGES } from './data/languages'

export default function App() {
  const { settings, toggleKnownLanguage, setTargetLanguage, toggleSetting } = useSettings()
  const [showSetup, setShowSetup] = useState(true)
  const [expandedWord, setExpandedWord] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const targetLang = LANGUAGES.find(l => l.code === settings.targetLanguage)

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
    if (!q) return !activeCategory || w.category === activeCategory
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
    const matchesSearch = allText.some(s => s.toLowerCase().includes(q))
    const matchesCategory = !activeCategory || w.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {showSetup && (
        <LanguageSetup
          settings={settings}
          onToggleKnown={toggleKnownLanguage}
          onSetTarget={setTargetLanguage}
          onClose={() => setShowSetup(false)}
        />
      )}

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗺️</span>
            <div>
              <h1 className="text-lg font-bold leading-none">EtymoMap</h1>
              <p className="text-xs text-slate-500 leading-none mt-0.5">Interactive Language Learning</p>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search words, roots..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {targetLang && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-lg text-sm">
                <span>Learning:</span>
                <span>{targetLang.flag}</span>
                <span className="font-semibold" style={{ color: targetLang.color }}>{targetLang.name}</span>
              </div>
            )}
            <button
              onClick={() => setShowSetup(true)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
            >
              ⚙️ Languages
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 space-y-4 hidden lg:block">
          <LanguageMap
            knownLanguages={settings.knownLanguages}
            targetLanguage={settings.targetLanguage}
          />

          <SettingsPanel settings={settings} onToggle={toggleSetting} />

          {/* Known languages summary */}
          <div className="bg-slate-900/60 rounded-2xl border border-slate-700/60 p-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Your Languages</h3>
            <div className="space-y-1.5">
              {settings.knownLanguages.map(code => {
                const lang = LANGUAGES.find(l => l.code === code)
                if (!lang) return null
                return (
                  <div key={code} className="flex items-center gap-2 text-sm">
                    <span>{lang.flag}</span>
                    <span className="text-slate-300">{lang.name}</span>
                    <span className="text-xs text-slate-600 ml-auto">{lang.branch}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Category filter */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                !activeCategory
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({WORD_ENTRIES.length})
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Stats bar */}
          <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
            <span>{filtered.length} words</span>
            <span>·</span>
            <span>
              {settings.knownLanguages.length} known language{settings.knownLanguages.length !== 1 ? 's' : ''}
            </span>
            <span>·</span>
            <span>showing cognates across Romance & Germanic branches</span>
          </div>

          {/* Word list */}
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
                <div>No words match your search.</div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
