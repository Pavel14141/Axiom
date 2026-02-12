'use client'

import { Input } from '@/components/ui/input'
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
    router.push(`/topics/${topicId}`)
    setQuery('')
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Поиск по темам..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-card border rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
          {results.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleSelect(topic.id)}
              className="w-full text-left px-4 py-3 hover:bg-accent transition-colors border-b last:border-b-0"
              type="button"
            >
              <p className="font-medium">{topic.title}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
