import type { WordEntry } from '../data/words'
import { LANGUAGES } from '../data/languages'

interface Props {
  word: WordEntry
  knownLanguages: string[]
  targetLanguage: string
}

export function EtymologyTree({ word, knownLanguages, targetLanguage }: Props) {
  const allLangCodes = [...new Set([...knownLanguages, targetLanguage, 'la'])]
  const relevantEntries = word.languages.filter(e => allLangCodes.includes(e.langCode))

  const getLang = (code: string) => LANGUAGES.find(l => l.code === code)

  const hasLatin = relevantEntries.some(e => e.langCode === 'la')
  const latinEntry = relevantEntries.find(e => e.langCode === 'la')
  const otherEntries = relevantEntries.filter(e => e.langCode !== 'la')

  return (
    <div className="relative">
      {/* Etymology chain */}
      {word.etymology.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            {word.etymology.map((node, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="bg-amber-900/30 border border-amber-700/50 rounded-lg px-3 py-1.5 text-center">
                  <div className="text-xs text-amber-400 font-medium">{node.source}</div>
                  <div className="text-amber-200 font-bold font-mono">{node.word}</div>
                  {node.meaning && <div className="text-xs text-amber-400/70 italic">"{node.meaning}"</div>}
                </div>
                {i < word.etymology.length - 1 && (
                  <span className="text-slate-500 text-lg">→</span>
                )}
              </div>
            ))}
            <span className="text-slate-500 text-lg">→</span>
            <div className="text-slate-400 text-sm italic">Modern languages...</div>
          </div>
        </div>
      )}

      {/* Language comparison tree */}
      <div className="grid gap-3">
        {/* Latin root if exists */}
        {hasLatin && latinEntry && (
          <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-900/20 border border-amber-700/30">
            <span className="text-2xl mt-0.5">🏛️</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">Latin Root</span>
                {word.latinRoot && (
                  <span className="text-xs text-amber-600 font-mono">{word.latinRoot}</span>
                )}
              </div>
              <div className="text-amber-200 font-bold text-lg">{latinEntry.forms[0].word}</div>
              {latinEntry.forms[0].ipa && (
                <div className="text-xs text-amber-500 font-mono mt-0.5">{latinEntry.forms[0].ipa}</div>
              )}
            </div>
          </div>
        )}

        {/* Connector */}
        {hasLatin && otherEntries.length > 0 && (
          <div className="flex justify-center text-slate-600 text-xs gap-1 my-1">
            <span>└── descended into ──┘</span>
          </div>
        )}

        {/* Modern languages */}
        <div className="grid sm:grid-cols-2 gap-2">
          {otherEntries.map(entry => {
            const lang = getLang(entry.langCode)
            if (!lang) return null
            const isTarget = entry.langCode === targetLanguage
            const isKnown = knownLanguages.includes(entry.langCode)
            const isFalseFriend = entry.cognateStrength === 'false-friend'

            return (
              <div
                key={entry.langCode}
                className={`p-3 rounded-xl border transition-all ${
                  isTarget
                    ? 'border-2 ring-2 ring-offset-2 ring-offset-slate-900'
                    : 'border'
                } ${isFalseFriend ? 'border-red-500/50 bg-red-950/20' : 'bg-slate-800/50'}`}
                style={
                  isTarget
                    ? { borderColor: lang.color, '--tw-ring-color': lang.color + '40' } as React.CSSProperties
                    : isKnown
                    ? { borderColor: lang.color + '60', backgroundColor: lang.color + '0A' }
                    : { borderColor: '#334155' }
                }
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{lang.flag}</span>
                    <span className="text-xs font-semibold" style={{ color: lang.color }}>
                      {lang.name}
                    </span>
                    {isTarget && <span className="text-xs bg-indigo-600 text-white px-1.5 py-0.5 rounded">learning</span>}
                    {isKnown && !isTarget && <span className="text-xs bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded">known</span>}
                  </div>
                  <CognateStrengthBadge strength={entry.cognateStrength} />
                </div>

                {entry.forms.map((form, i) => (
                  <div key={i} className={i > 0 ? 'mt-1.5 pt-1.5 border-t border-slate-700' : ''}>
                    <div className="text-white font-bold text-lg">{form.word}</div>
                    {form.ipa && (
                      <div className="text-xs text-slate-500 font-mono">{form.ipa}</div>
                    )}
                    {form.context && (
                      <div className="text-xs text-slate-400 mt-0.5 italic">{form.context}</div>
                    )}
                    {form.register && form.register !== 'neutral' && (
                      <span className={`text-xs px-1.5 py-0.5 rounded mt-1 inline-block ${registerColor(form.register)}`}>
                        {form.register}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function CognateStrengthBadge({ strength }: { strength?: string }) {
  if (!strength || strength === 'close') return null
  const map: Record<string, { label: string; className: string }> = {
    'identical': { label: 'identical', className: 'bg-emerald-900/50 text-emerald-400 border border-emerald-700/50' },
    'distant': { label: 'distant cousin', className: 'bg-blue-900/50 text-blue-400 border border-blue-700/50' },
    'false-friend': { label: '⚠️ false friend', className: 'bg-red-900/50 text-red-400 border border-red-700/50' },
  }
  const config = map[strength]
  if (!config) return null
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${config.className}`}>
      {config.label}
    </span>
  )
}

function registerColor(register: string) {
  const map: Record<string, string> = {
    formal: 'bg-blue-900/40 text-blue-300',
    informal: 'bg-orange-900/40 text-orange-300',
    colloquial: 'bg-yellow-900/40 text-yellow-300',
    archaic: 'bg-purple-900/40 text-purple-300',
  }
  return map[register] ?? 'bg-slate-700 text-slate-300'
}
