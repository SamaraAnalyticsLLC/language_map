import { LANGUAGES } from '../data/languages'
import { useT } from '../hooks/useTranslation'

interface Props {
  knownLanguages: string[]
  targetLanguage: string
}

// Positions on a simplified language family tree (SVG coordinate space 0-600 x 0-340)
const LANG_POSITIONS: Record<string, { x: number; y: number }> = {
  la:    { x: 300, y: 35 },
  it:    { x: 165, y: 130 },
  es:    { x: 235, y: 200 },
  pt:    { x: 140, y: 220 },
  gl:    { x: 185, y: 265 },
  fr:    { x: 330, y: 150 },
  oc:    { x: 290, y: 210 },
  ro:    { x: 415, y: 130 },
  ca:    { x: 285, y: 155 },
  en:    { x: 510, y: 230 },
  de:    { x: 475, y: 150 },
  nl:    { x: 545, y: 195 },
}

const TREE_EDGES = [
  ['la', 'it'], ['la', 'es'], ['la', 'pt'], ['la', 'fr'], ['la', 'ro'], ['la', 'ca'], ['la', 'oc'],
  ['pt', 'gl'],
  ['es', 'gl'],
  ['de', 'en'], ['de', 'nl'],
]

export function LanguageMap({ knownLanguages, targetLanguage }: Props) {
  const t = useT()
  return (
    <div className="relative bg-slate-900/60 rounded-2xl border border-slate-700/60 overflow-hidden">
      <div className="px-4 pt-3 pb-1">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{t.lang_tree_title}</h3>
      </div>
      <svg viewBox="0 0 580 290" className="w-full h-auto">
        {/* Family group backgrounds */}
        <ellipse cx="285" cy="180" rx="200" ry="95" fill="#7C3AED11" stroke="#7C3AED22" strokeWidth="1" />
        <text x="90" y="260" fontSize="9" fill="#7C3AED55" fontWeight="600">Romance branch</text>
        <ellipse cx="500" cy="195" rx="72" ry="65" fill="#3B82F611" stroke="#3B82F622" strokeWidth="1" />
        <text x="450" y="272" fontSize="9" fill="#3B82F655" fontWeight="600">Germanic branch</text>

        {/* Edges */}
        {TREE_EDGES.map(([from, to]) => {
          const a = LANG_POSITIONS[from]
          const b = LANG_POSITIONS[to]
          if (!a || !b) return null
          const isRelevant =
            (knownLanguages.includes(from) || from === targetLanguage || from === 'la') &&
            (knownLanguages.includes(to) || to === targetLanguage || to === 'la')
          return (
            <line
              key={`${from}-${to}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={isRelevant ? '#6366F155' : '#33415566'}
              strokeWidth={isRelevant ? 2 : 1}
              strokeDasharray={isRelevant ? undefined : '4,4'}
            />
          )
        })}

        {/* Nodes */}
        {LANGUAGES.map(lang => {
          const pos = LANG_POSITIONS[lang.code]
          if (!pos) return null
          const isTarget = lang.code === targetLanguage
          const isKnown = knownLanguages.includes(lang.code)
          const isLatin = lang.code === 'la'
          const isActive = isTarget || isKnown || isLatin
          const r = isLatin ? 22 : isTarget ? 20 : 16

          return (
            <g key={lang.code} transform={`translate(${pos.x},${pos.y})`}>
              {isTarget && (
                <circle r={r + 6} fill="none" stroke={lang.color} strokeWidth="2" opacity="0.4">
                  <animate attributeName="r" values={`${r + 4};${r + 9};${r + 4}`} dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                r={r}
                fill={isActive ? lang.color + '33' : '#1e293b'}
                stroke={isActive ? lang.color : '#334155'}
                strokeWidth={isTarget ? 2.5 : isLatin ? 2 : 1.5}
                opacity={isActive ? 1 : 0.4}
              />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={isLatin ? 14 : 13}
              >
                {lang.flag}
              </text>
              <text
                y={r + 11}
                textAnchor="middle"
                fontSize="8"
                fill={isActive ? lang.color : '#475569'}
                fontWeight={isTarget ? '700' : '500'}
              >
                {lang.code === 'la' ? 'LATIN' : lang.name}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
