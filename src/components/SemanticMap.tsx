import { useState, useRef, useCallback, useEffect } from 'react'
import type { WordEntry } from '../data/words'
import type { Settings } from '../hooks/useSettings'
import { LANGUAGES } from '../data/languages'
import { NODE_POSITIONS, ETYMOLOGY_EDGES, CATEGORY_COLORS } from '../data/mapLayout'
import { WordCard } from './WordCard'

interface Props {
  words: WordEntry[]
  settings: Settings
}

interface ViewBox { x: number; y: number; w: number; h: number }
const INITIAL_VB: ViewBox = { x: -20, y: -20, w: 860, h: 620 }

export function SemanticMap({ words, settings }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [vb, setVb] = useState<ViewBox>(INITIAL_VB)
  const [isPanning, setIsPanning] = useState(false)
  const lastMouse = useRef({ x: 0, y: 0 })
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const wordMap = Object.fromEntries(words.map(w => [w.id, w]))
  const visibleIds = new Set(words.map(w => w.id))

  // Only show edges where both nodes are visible
  const visibleEdges = ETYMOLOGY_EDGES.filter(
    e => visibleIds.has(e.source) && visibleIds.has(e.target)
  )

  const getSVGPoint = useCallback((clientX: number, clientY: number) => {
    const el = svgRef.current
    if (!el) return { x: 0, y: 0 }
    const rect = el.getBoundingClientRect()
    return {
      x: vb.x + ((clientX - rect.left) / rect.width) * vb.w,
      y: vb.y + ((clientY - rect.top) / rect.height) * vb.h,
    }
  }, [vb])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as SVGElement).closest('.map-node')) return
    setIsPanning(true)
    lastMouse.current = { x: e.clientX, y: e.clientY }
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return
    const el = svgRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = ((e.clientX - lastMouse.current.x) / rect.width) * vb.w
    const dy = ((e.clientY - lastMouse.current.y) / rect.height) * vb.h
    lastMouse.current = { x: e.clientX, y: e.clientY }
    setVb(v => ({ ...v, x: v.x - dx, y: v.y - dy }))
  }, [isPanning, vb.w, vb.h])

  const onMouseUp = useCallback(() => setIsPanning(false), [])

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const factor = e.deltaY > 0 ? 1.12 : 0.89
    const pt = getSVGPoint(e.clientX, e.clientY)
    setVb(v => {
      const nw = Math.min(2000, Math.max(280, v.w * factor))
      const nh = Math.min(1500, Math.max(200, v.h * factor))
      return {
        x: pt.x - (pt.x - v.x) * (nw / v.w),
        y: pt.y - (pt.y - v.y) * (nh / v.h),
        w: nw,
        h: nh,
      }
    })
  }, [getSVGPoint])

  // Touch pan
  const lastTouch = useRef({ x: 0, y: 0 })
  const onTouchStart = (e: React.TouchEvent) => {
    lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchMove = (e: React.TouchEvent) => {
    const el = svgRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = ((e.touches[0].clientX - lastTouch.current.x) / rect.width) * vb.w
    const dy = ((e.touches[0].clientY - lastTouch.current.y) / rect.height) * vb.h
    lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    setVb(v => ({ ...v, x: v.x - dx, y: v.y - dy }))
  }

  const resetView = () => setVb(INITIAL_VB)

  const selectedWord = selectedId ? wordMap[selectedId] : null

  return (
    <div className="flex gap-4 h-[calc(100vh-120px)] min-h-[500px]">
      {/* Map canvas */}
      <div className="flex-1 relative rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-950">
        {/* Legend */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1 max-w-[220px]">
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) => {
            const hasVisible = words.some(w => w.category === cat)
            if (!hasVisible) return null
            return (
              <div key={cat} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/60">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <span className="text-slate-400 truncate max-w-[120px]">{cat}</span>
              </div>
            )
          })}
        </div>

        {/* Controls */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
          <button onClick={resetView} className="w-8 h-8 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 text-xs flex items-center justify-center" title="Reset view">⌂</button>
          <button onClick={() => setVb(v => ({ ...v, w: v.w * 0.85, h: v.h * 0.85 }))} className="w-8 h-8 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 text-lg flex items-center justify-center">+</button>
          <button onClick={() => setVb(v => ({ ...v, w: v.w * 1.15, h: v.h * 1.15 }))} className="w-8 h-8 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 text-lg flex items-center justify-center">−</button>
        </div>

        <svg
          ref={svgRef}
          className={`w-full h-full select-none ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
          viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onWheel={onWheel}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
        >
          <defs>
            {/* Glow filter for selected node */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Edges */}
          {visibleEdges.map(edge => {
            const aPos = NODE_POSITIONS[edge.source]
            const bPos = NODE_POSITIONS[edge.target]
            if (!aPos || !bPos) return null
            const opacity = edge.strength === 'strong' ? 0.35 : edge.strength === 'medium' ? 0.2 : 0.1
            const width = edge.strength === 'strong' ? 1.5 : edge.strength === 'medium' ? 1 : 0.5
            const isConnectedToSelected = selectedId === edge.source || selectedId === edge.target
            return (
              <line
                key={`${edge.source}-${edge.target}`}
                x1={aPos.x} y1={aPos.y}
                x2={bPos.x} y2={bPos.y}
                stroke={isConnectedToSelected ? '#818CF8' : '#64748B'}
                strokeWidth={isConnectedToSelected ? width + 1 : width}
                opacity={isConnectedToSelected ? 0.7 : opacity}
                strokeDasharray={edge.strength === 'weak' ? '3,4' : undefined}
              />
            )
          })}

          {/* Nodes */}
          {words.map(word => {
            const pos = NODE_POSITIONS[word.id]
            if (!pos) return null
            const color = CATEGORY_COLORS[word.category] ?? '#6366F1'
            const isSelected = selectedId === word.id
            const targetEntry = word.languages.find(e => settings.targetLanguages.includes(e.langCode))
            const cognateStrength = targetEntry?.cognateStrength

            const cognateColor =
              cognateStrength === 'identical' ? '#10B981' :
              cognateStrength === 'false-friend' ? '#EF4444' :
              cognateStrength === 'distant' ? '#64748B' :
              color

            return (
              <g
                key={word.id}
                className="map-node"
                transform={`translate(${pos.x},${pos.y})`}
                onClick={() => setSelectedId(isSelected ? null : word.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Selected pulse ring */}
                {isSelected && (
                  <circle r="26" fill="none" stroke={color} strokeWidth="2" opacity="0.5" filter="url(#glow)">
                    <animate attributeName="r" values="22;30;22" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                )}
                {/* Cognate strength outer ring */}
                <circle
                  r="20"
                  fill="none"
                  stroke={cognateColor}
                  strokeWidth={isSelected ? 3 : 1.5}
                  opacity={isSelected ? 1 : 0.6}
                />
                {/* Main circle */}
                <circle
                  r="17"
                  fill={color + (isSelected ? '55' : '22')}
                  stroke={color}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                />
                {/* Label */}
                <text
                  textAnchor="middle"
                  y="30"
                  fontSize="8.5"
                  fill={isSelected ? color : '#94A3B8'}
                  fontWeight={isSelected ? '700' : '500'}
                >
                  {word.concept}
                </text>
                {/* Target word inside node */}
                {targetEntry && (
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="7"
                    fill={isSelected ? '#FFFFFF' : '#CBD5E1'}
                    fontWeight="600"
                  >
                    {targetEntry.forms[0]?.word ?? ''}
                  </text>
                )}
              </g>
            )
          })}
        </svg>

        {/* Hint */}
        <div className="absolute bottom-3 left-3 text-xs text-slate-600">
          Scroll to zoom · Drag to pan · Click node to explore
        </div>
      </div>

      {/* Side panel */}
      {selectedWord ? (
        <div className="w-80 shrink-0 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">{selectedWord.category}</div>
                <div className="text-white font-bold">{selectedWord.concept}</div>
              </div>
              <button
                onClick={() => setSelectedId(null)}
                className="text-slate-500 hover:text-slate-300 text-xl leading-none"
              >
                ×
              </button>
            </div>
            {/* Connections list */}
            <ConnectedWords word={selectedWord} allWords={wordMap} />
            {/* Full word card */}
            <div className="border-t border-slate-800">
              <WordCard
                word={selectedWord}
                settings={settings}
                isExpanded={true}
                onToggle={() => {}}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-80 shrink-0 flex items-center justify-center text-center px-4">
          <div className="text-slate-600">
            <div className="text-4xl mb-3">🕸️</div>
            <div className="text-sm">Click any node on the map to explore that word's etymology and cognates.</div>
          </div>
        </div>
      )}
    </div>
  )
}

function ConnectedWords({ word, allWords }: { word: WordEntry; allWords: Record<string, WordEntry> }) {
  const connected = ETYMOLOGY_EDGES
    .filter(e => e.source === word.id || e.target === word.id)
    .map(e => {
      const otherId = e.source === word.id ? e.target : e.source
      return { word: allWords[otherId], strength: e.strength }
    })
    .filter(c => c.word)

  if (connected.length === 0) return null

  return (
    <div className="px-4 py-3 border-b border-slate-800">
      <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Connected words</div>
      <div className="flex flex-wrap gap-1.5">
        {connected.map(({ word: w, strength }) => {
          if (!w) return null
          const color = CATEGORY_COLORS[w.category] ?? '#6366F1'
          return (
            <span
              key={w.id}
              className="text-xs px-2 py-0.5 rounded-full border"
              style={{ borderColor: color + '60', color, backgroundColor: color + '15' }}
            >
              {strength === 'strong' ? '●' : strength === 'medium' ? '◐' : '○'} {w.concept}
            </span>
          )
        })}
      </div>
    </div>
  )
}
