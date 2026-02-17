'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { getTelegramWebApp } from '@/lib/telegram'
import type { Topic } from '@/lib/types'
import Link from 'next/link'

interface TopicListProps {
  topics: Topic[]
}

export function TopicList({ topics }: TopicListProps) {
  const handleClick = () => {
    const tg = getTelegramWebApp()
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred('light')
    }
  }

  return (
    <div className="space-y-3">
      {topics.map((topic, index) => (
        <Link key={topic.id} href={`/topics/${topic.id}`} onClick={handleClick}>
          <Card className="group hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer border-l-4 border-l-primary/50 hover:border-l-primary">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {index + 1}
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg mb-1">{topic.title}</CardTitle>
                {topic.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{topic.description}</p>
                )}
              </div>
              <div className="text-muted-foreground group-hover:text-primary transition-colors">
                →
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
