import { useQuiz } from '../hooks/useQuiz'
import type { WordEntry } from '../data/words'
import type { Settings } from '../hooks/useSettings'
import { LANGUAGES } from '../data/languages'
import { useT } from '../hooks/useTranslation'
import { useState, useRef, useEffect, useCallback } from 'react'

interface Props {
  words: WordEntry[]
  settings: Settings
}

function normalize(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}

export function QuizMode({ words, settings }: Props) {
  const t = useT()
  const wordIds = words.map(w => w.id)
  const [state, actions] = useQuiz(wordIds)
  const [guess, setGuess] = useState('')
  const [guessResult, setGuessResult] = useState<'correct' | 'incorrect' | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const word = words.find(w => w.id === state.currentId)
  const targetLang = LANGUAGES.find(l => l.code === settings.targetLanguage)
  const knownEntries = word?.languages.filter(e => settings.knownLanguages.includes(e.langCode)) ?? []
  const targetEntry = word?.languages.find(e => e.langCode === settings.targetLanguage)

  // Collect all accepted forms for the target word
  const acceptedForms = targetEntry?.forms.map(f => normalize(f.word)) ?? []

  const seen = state.correct.size + state.incorrect.size + state.skipped.size
  const progress = state.total > 0 ? (seen / state.total) * 100 : 0
  const answeredCount = state.correct.size + state.incorrect.size
  const scorePercent = answeredCount > 0
    ? Math.round((state.correct.size / answeredCount) * 100)
    : null

  // Reset guess when card changes
  useEffect(() => {
    setGuess('')
    setGuessResult(null)
    if (state.phase === 'question') {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [state.currentId, state.phase])

  const handleGuessSubmit = useCallback(() => {
    if (!guess.trim()) return
    const isCorrect = acceptedForms.includes(normalize(guess))
    setGuessResult(isCorrect ? 'correct' : 'incorrect')
    actions.reveal()
    if (isCorrect) {
      // Auto-mark correct after a short delay so the user sees the answer
      setTimeout(() => actions.markCorrect(), 900)
    }
  }, [guess, acceptedForms, actions])

  if (state.phase === 'done') {
    return <QuizSummary state={state} onRestart={actions.restart} onReshuffle={actions.reshuffle} />
  }

  if (!word) return null

  return (
    <div className="flex flex-col items-center min-h-[60vh] py-8 px-4">
      {/* Progress bar */}
      <div className="w-full max-w-xl mb-6">
        <div className="flex justify-between text-xs text-slate-500 mb-1.5">
          <span>{t.quiz_cards(seen, state.total)}</span>
          {scorePercent !== null && (
            <span className="text-emerald-400">{t.quiz_score(scorePercent)}</span>
          )}
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex gap-3 mt-1.5 text-xs">
          <span className="text-emerald-400">{t.quiz_correct_count} {state.correct.size}</span>
          <span className="text-red-400">{t.quiz_missed_count} {state.incorrect.size}</span>
          <span className="text-slate-500">{state.skipped.size} {t.quiz_skipped_count}</span>
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-xl">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
          {/* Category tag */}
          <div className="px-6 pt-5 pb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              {word.category}
            </span>
            <span className="text-xs text-slate-600">#{state.currentIndex + 1}</span>
          </div>

          {/* Concept */}
          <div className="px-6 pb-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">{word.concept}</div>
            {word.latinRoot && (
              <div className="text-sm text-amber-600 font-mono mb-4">← {word.latinRoot}</div>
            )}

            {/* Known-language hints */}
            {knownEntries.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {knownEntries.map(entry => {
                  const lang = LANGUAGES.find(l => l.code === entry.langCode)
                  if (!lang) return null
                  return (
                    <div
                      key={entry.langCode}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm"
                      style={{ borderColor: lang.color + '60', backgroundColor: lang.color + '15' }}
                    >
                      <span>{lang.flag}</span>
                      <span className="font-medium" style={{ color: lang.color }}>{entry.forms[0]?.word}</span>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Target language reveal */}
            {state.phase === 'question' ? (
              <div className="space-y-3">
                {/* Typing input */}
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={guess}
                    onChange={e => setGuess(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleGuessSubmit() }}
                    placeholder={t.quiz_type_placeholder(targetLang?.nativeName ?? targetLang?.name ?? '')}
                    className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-base"
                  />
                  <button
                    onClick={handleGuessSubmit}
                    disabled={!guess.trim()}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl font-semibold transition-colors"
                  >
                    {t.quiz_check}
                  </button>
                </div>
                <button
                  onClick={actions.reveal}
                  className="w-full py-2 text-slate-500 hover:text-slate-300 text-sm transition-colors"
                >
                  {t.quiz_reveal_no_guess}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Guess result banner */}
                {guessResult === 'correct' && (
                  <div className="flex items-center justify-center gap-2 py-2 bg-emerald-900/40 border border-emerald-700/60 rounded-xl text-emerald-300 font-semibold text-sm">
                    {t.quiz_correct_banner}
                  </div>
                )}
                {guessResult === 'incorrect' && guess && (
                  <div className="flex items-center justify-center gap-2 py-2 bg-red-900/30 border border-red-700/50 rounded-xl text-red-300 text-sm">
                    {t.quiz_wrong_banner(guess)}
                  </div>
                )}

                {/* Revealed word */}
                <div
                  className="py-4 px-6 rounded-xl border-2 text-center"
                  style={{ borderColor: targetLang?.color, backgroundColor: (targetLang?.color ?? '#6366f1') + '15' }}
                >
                  <div className="text-3xl font-bold text-white mb-1" style={{ color: targetLang?.color }}>
                    {targetEntry?.forms[0]?.word ?? '—'}
                  </div>
                  {targetEntry?.forms[0]?.ipa && (
                    <div className="text-sm text-slate-400 font-mono">{targetEntry.forms[0].ipa}</div>
                  )}
                  {targetEntry?.forms[0]?.context && (
                    <div className="text-xs text-slate-500 mt-1 italic">{targetEntry.forms[0].context}</div>
                  )}
                  {targetEntry?.cognateStrength === 'false-friend' && (
                    <div className="mt-2 text-xs bg-red-900/40 text-red-300 border border-red-700/40 rounded px-2 py-1 inline-block">
                      {t.quiz_false_friend}
                    </div>
                  )}
                  {targetEntry?.forms.length && targetEntry.forms.length > 1 && (
                    <div className="mt-2 space-y-1">
                      {targetEntry.forms.slice(1).map((form, i) => (
                        <div key={i} className="text-sm text-slate-400">
                          {t.quiz_also} <span className="font-medium text-white">{form.word}</span>
                          {form.context && <span className="text-slate-500"> ({form.context})</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fun fact if any */}
                {word.funFact && (
                  <div className="text-xs text-slate-500 leading-relaxed bg-slate-800/60 rounded-lg px-4 py-2 text-left">
                    💡 {word.funFact}
                  </div>
                )}

                {/* Judgment buttons — hidden while auto-advancing after correct guess */}
                {guessResult !== 'correct' && (
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={actions.markIncorrect}
                      className="py-2.5 bg-red-900/40 hover:bg-red-800/60 border border-red-700/60 text-red-300 rounded-xl font-medium transition-colors text-sm"
                    >
                      {t.quiz_missed_btn}
                    </button>
                    <button
                      onClick={actions.skip}
                      className="py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 rounded-xl font-medium transition-colors text-sm"
                    >
                      {t.quiz_skip_btn}
                    </button>
                    <button
                      onClick={actions.markCorrect}
                      className="py-2.5 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-700/60 text-emerald-300 rounded-xl font-medium transition-colors text-sm"
                    >
                      {t.quiz_got_it_btn}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Skip card shortcut */}
        {state.phase === 'question' && (
          <div className="mt-3 text-center">
            <button onClick={actions.skip} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
              {t.quiz_skip_link}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function QuizSummary({
  state,
  onRestart,
  onReshuffle,
}: {
  state: ReturnType<typeof useQuiz>[0]
  onRestart: () => void
  onReshuffle: () => void
}) {
  const t = useT()
  const answered = state.correct.size + state.incorrect.size
  const pct = answered > 0 ? Math.round((state.correct.size / answered) * 100) : 0
  const grade = pct >= 90 ? '🏆' : pct >= 70 ? '⭐' : pct >= 50 ? '💪' : '📖'

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-8 text-center">
      <div className="text-6xl mb-4">{grade}</div>
      <h2 className="text-3xl font-bold text-white mb-2">{t.quiz_done_title}</h2>
      {answered > 0 ? (
        <p className="text-slate-400 mb-6">{t.quiz_done_score(state.correct.size, answered, pct)}</p>
      ) : (
        <p className="text-slate-400 mb-6">{t.quiz_done_all_skipped}</p>
      )}

      <div className="flex gap-4 mb-8 text-sm">
        <div className="bg-emerald-900/30 border border-emerald-700/40 rounded-xl px-5 py-3 text-center">
          <div className="text-2xl font-bold text-emerald-400">{state.correct.size}</div>
          <div className="text-emerald-600 text-xs mt-0.5">{t.quiz_correct_label}</div>
        </div>
        <div className="bg-red-900/30 border border-red-700/40 rounded-xl px-5 py-3 text-center">
          <div className="text-2xl font-bold text-red-400">{state.incorrect.size}</div>
          <div className="text-red-600 text-xs mt-0.5">{t.quiz_missed_label}</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-3 text-center">
          <div className="text-2xl font-bold text-slate-400">{state.skipped.size}</div>
          <div className="text-slate-600 text-xs mt-0.5">{t.quiz_skipped_label}</div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onReshuffle}
          className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl font-medium transition-colors"
        >
          {t.quiz_reshuffle}
        </button>
        <button
          onClick={onRestart}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors"
        >
          {t.quiz_restart}
        </button>
      </div>
    </div>
  )
}
