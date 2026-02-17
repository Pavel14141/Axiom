'use client'

import { Input } from '@/components/ui/input'
import { getTelegramWebApp } from '@/lib/telegram'
import type { Topic } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface SearchBarProps {
  topics: Topic[]
}

export function SearchBar({ topics }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Topic[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
      setIsOpen(false)
      return
    }

    const filtered = topics.filter((topic) =>
      topic.title.toLowerCase().includes(query.toLowerCase()),
    )
    setResults(filtered)
    setIsOpen(filtered.length > 0)
  }, [query, topics])

  const handleSelect = (topicId: string) => {
    const tg = getTelegramWebApp()
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred('light')
    }
    router.push(`/topics/${topicId}`)
    setQuery('')
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xl">
          🔍
        </div>
        <Input
          type="search"
          placeholder="Поиск по темам..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 h-12 text-base rounded-xl border-2 focus:border-primary shadow-sm"
        />
      </div>
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-card border-2 border-primary/20 rounded-xl shadow-xl z-10 max-h-80 overflow-y-auto">
          {results.map((topic, index) => (
            <button
              key={topic.id}
              onClick={() => handleSelect(topic.id)}
              className="w-full text-left px-4 py-4 hover:bg-primary/5 transition-all border-b last:border-b-0 flex items-center gap-3 group"
              type="button"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {index + 1}
              </div>
              <p className="font-medium flex-1">{topic.title}</p>
              <div className="text-muted-foreground group-hover:text-primary transition-colors">
                →
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
