import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import type { Topic } from '@/lib/types'
import Link from 'next/link'

interface TopicListProps {
  topics: Topic[]
}

export function TopicList({ topics }: TopicListProps) {
  return (
    <div className="space-y-3">
      {topics.map((topic) => (
        <Link key={topic.id} href={`/topics/${topic.id}`}>
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">{topic.title}</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
