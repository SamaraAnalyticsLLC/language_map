import type { WordEntry } from '../data/words'
import { REGIONS, LANGUAGES } from '../data/languages'

interface Props {
  word: WordEntry
  knownLanguages: string[]
  targetLanguages: string[]
}

export function RegionalVariants({ word, knownLanguages, targetLanguages }: Props) {
  const relevantLangCodes = [...new Set([...knownLanguages, ...targetLanguages])]

  const entriesWithRegional = word.languages.filter(
    e => e.regional && e.regional.length > 0 && relevantLangCodes.includes(e.langCode)
  )

  if (entriesWithRegional.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 text-sm">
        No significant regional variants for this word in your selected languages.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {entriesWithRegional.map(entry => {
        const lang = LANGUAGES.find(l => l.code === entry.langCode)
        if (!lang || !entry.regional) return null

        return (
          <div key={entry.langCode}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{lang.flag}</span>
              <h3 className="font-semibold text-slate-200">{lang.name} Regional Variants</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {entry.regional.map(variant => {
                const region = REGIONS.find(r => r.code === variant.regionCode)
                return (
                  <div
                    key={variant.regionCode}
                    className="p-3 rounded-xl bg-slate-800/60 border border-slate-700"
                    style={{ borderLeftColor: lang.color, borderLeftWidth: 3 }}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-base">{region?.flag}</span>
                      <span className="text-sm font-medium text-slate-300">{region?.name ?? variant.regionCode}</span>
                    </div>
                    <div className="text-white font-bold text-lg">{variant.word}</div>
                    {variant.ipa && (
                      <div className="text-xs text-slate-500 font-mono">{variant.ipa}</div>
                    )}
                    {variant.notes && (
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{variant.notes}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
