import { useState, useCallback, useMemo } from 'react'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export type QuizPhase = 'question' | 'revealed' | 'done'

export interface QuizState {
  phase: QuizPhase
  currentId: string | null
  currentIndex: number
  total: number
  correct: Set<string>
  incorrect: Set<string>
  skipped: Set<string>
}

export interface QuizActions {
  reveal: () => void
  markCorrect: () => void
  markIncorrect: () => void
  skip: () => void
  restart: () => void
  reshuffle: () => void
}

export function useQuiz(wordIds: string[]): [QuizState, QuizActions] {
  const [queue, setQueue] = useState(() => shuffle(wordIds))
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<QuizPhase>('question')
  const [correct, setCorrect] = useState<Set<string>>(new Set())
  const [incorrect, setIncorrect] = useState<Set<string>>(new Set())
  const [skipped, setSkipped] = useState<Set<string>>(new Set())

  const advance = useCallback((updatedIndex: number) => {
    if (updatedIndex >= queue.length) {
      setPhase('done')
    } else {
      setIndex(updatedIndex)
      setPhase('question')
    }
  }, [queue.length])

  const reveal = useCallback(() => setPhase('revealed'), [])

  const markCorrect = useCallback(() => {
    const id = queue[index]
    setCorrect(s => new Set([...s, id]))
    advance(index + 1)
  }, [queue, index, advance])

  const markIncorrect = useCallback(() => {
    const id = queue[index]
    setIncorrect(s => new Set([...s, id]))
    advance(index + 1)
  }, [queue, index, advance])

  const skip = useCallback(() => {
    const id = queue[index]
    setSkipped(s => new Set([...s, id]))
    advance(index + 1)
  }, [queue, index, advance])

  const restart = useCallback(() => {
    setQueue(shuffle(wordIds))
    setIndex(0)
    setPhase('question')
    setCorrect(new Set())
    setIncorrect(new Set())
    setSkipped(new Set())
  }, [wordIds])

  const reshuffle = useCallback(() => {
    setQueue(shuffle(wordIds))
    setIndex(0)
    setPhase('question')
  }, [wordIds])

  const state = useMemo<QuizState>(() => ({
    phase,
    currentId: queue[index] ?? null,
    currentIndex: index,
    total: queue.length,
    correct,
    incorrect,
    skipped,
  }), [phase, queue, index, correct, incorrect, skipped])

  return [state, { reveal, markCorrect, markIncorrect, skip, restart, reshuffle }]
}
