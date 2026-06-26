import { useState } from 'react'
import type { WordEntry } from '../data/words'
import { LANGUAGES } from '../data/languages'
import { EtymologyTree } from './EtymologyTree'
import { RegionalVariants } from './RegionalVariants'
import type { Settings } from '../hooks/useSettings'

interface Props {
  word: WordEntry
  settings: Settings
  isExpanded: boolean
  onToggle: () => void
  matchHint?: string | null
}

type Tab = 'overview' | 'etymology' | 'regional'

export function WordCard({ word, settings, isExpanded, onToggle, matchHint }: Props) {
  const [tab, setTab] = useState<Tab>('overview')

  const targetLang = LANGUAGES.find(l => l.code === settings.targetLanguage)
  const targetEntry = word.languages.find(e => e.langCode === settings.targetLanguage)
  const targetWord = targetEntry?.forms[0]?.word ?? '—'

  const knownEntries = word.languages.filter(
    e => settings.knownLanguages.includes(e.langCode) && e.langCode !== 'la'
  )

  const isFalseFriend = targetEntry?.cognateStrength === 'false-friend'

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        isExpanded
          ? 'border-slate-600 bg-slate-900'
          : 'border-slate-700/60 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-900/80'
      }`}
    >
      {/* Card header — always visible */}
      <button
        className="w-full text-left p-4 flex items-start gap-4"
        onClick={onToggle}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{word.category}</span>
            {isFalseFriend && (
              <span className="text-xs bg-red-900/50 text-red-400 border border-red-700/50 px-1.5 py-0.5 rounded">
                ⚠️ false friend
              </span>
            )}
            {matchHint && (
              <span className="text-xs bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 px-1.5 py-0.5 rounded">
                matched in {matchHint}
              </span>
            )}
            {settings.showFalseFriends && targetEntry?.cognateStrength === 'identical' && (
              <span className="text-xs bg-emerald-900/40 text-emerald-400 px-1.5 py-0.5 rounded">
                ✓ same in Romance
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-slate-400 text-sm">{word.concept}</span>
            <span className="text-slate-600">→</span>
            <span className="text-white font-bold text-xl" style={{ color: targetLang?.color }}>
              {targetWord}
            </span>
            {targetEntry?.forms[0]?.ipa && settings.showIPA && (
              <span className="text-slate-500 text-sm font-mono">{targetEntry.forms[0].ipa}</span>
            )}
          </div>

          {/* Quick cognate preview */}
          {settings.showContext && (
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              {knownEntries.slice(0, 4).map(entry => {
                const lang = LANGUAGES.find(l => l.code === entry.langCode)
                return (
                  <span key={entry.langCode} className="text-xs text-slate-500 flex items-center gap-1">
                    <span>{lang?.flag}</span>
                    <span className="text-slate-400 font-medium">{entry.forms[0]?.word}</span>
                  </span>
                )
              })}
              {word.latinRoot && settings.showEtymology && (
                <span className="text-xs text-amber-700 font-mono ml-1">← {word.latinRoot}</span>
              )}
            </div>
          )}
        </div>

        <div className="text-slate-500 text-sm mt-1 shrink-0">
          {isExpanded ? '▲' : '▼'}
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-slate-800">
          {/* Tabs */}
          <div className="flex border-b border-slate-800 px-4">
            {[
              { id: 'overview' as Tab, label: 'Overview', show: true },
              { id: 'etymology' as Tab, label: 'Etymology', show: settings.showEtymology },
              { id: 'regional' as Tab, label: 'Regional', show: settings.showRegional },
            ].filter(t => t.show).map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  tab === t.id
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-4">
            {tab === 'overview' && (
              <OverviewTab word={word} settings={settings} />
            )}
            {tab === 'etymology' && settings.showEtymology && (
              <EtymologyTree
                word={word}
                knownLanguages={settings.knownLanguages}
                targetLanguage={settings.targetLanguage}
              />
            )}
            {tab === 'regional' && settings.showRegional && (
              <RegionalVariants
                word={word}
                knownLanguages={settings.knownLanguages}
                targetLanguage={settings.targetLanguage}
              />
            )}
          </div>

          {/* Fun fact */}
          {word.funFact && settings.showFunFact && (
            <div className="mx-4 mb-4 p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40">
              <div className="text-xs font-semibold text-indigo-400 mb-1">💡 Fun Fact</div>
              <p className="text-sm text-slate-300 leading-relaxed">{word.funFact}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function OverviewTab({ word, settings }: { word: WordEntry; settings: Settings }) {
  const relevantLangCodes = [...new Set([...settings.knownLanguages, settings.targetLanguage])]
  const entries = word.languages.filter(e => relevantLangCodes.includes(e.langCode) && e.langCode !== 'la')

  return (
    <div className="space-y-2">
      {entries.map(entry => {
        const lang = LANGUAGES.find(l => l.code === entry.langCode)
        const isTarget = entry.langCode === settings.targetLanguage
        if (!lang) return null

        return (
          <div
            key={entry.langCode}
            className={`flex items-start gap-3 p-3 rounded-xl ${isTarget ? 'bg-slate-800' : 'bg-slate-800/40'}`}
            style={isTarget ? { outline: `2px solid ${lang.color}40` } : {}}
          >
            <span className="text-xl shrink-0 mt-0.5">{lang.flag}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-semibold" style={{ color: lang.color }}>{lang.name}</span>
                {isTarget && <span className="text-xs bg-indigo-600/50 text-indigo-300 px-1.5 py-0.5 rounded">your target</span>}
              </div>
              {entry.forms.map((form, i) => (
                <div key={i} className={i > 0 ? 'mt-1 pt-1 border-t border-slate-700' : ''}>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-white font-semibold">{form.word}</span>
                    {form.ipa && settings.showIPA && (
                      <span className="text-slate-500 text-xs font-mono">{form.ipa}</span>
                    )}
                    {form.register && form.register !== 'neutral' && (
                      <span className="text-xs text-slate-500 italic">({form.register})</span>
                    )}
                  </div>
                  {form.context && settings.showContext && (
                    <p className="text-xs text-slate-400 mt-0.5">{form.context}</p>
                  )}
                  {form.notes && (
                    <p className="text-xs text-slate-500 mt-0.5 italic">{form.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
