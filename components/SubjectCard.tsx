'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { getTelegramWebApp } from '@/lib/telegram'
import type { Subject } from '@/lib/types'
import Link from 'next/link'

interface SubjectCardProps {
  subject: Subject
}

export function SubjectCard({ subject }: SubjectCardProps) {
  const handleClick = () => {
    const tg = getTelegramWebApp()
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred('light')
    }
  }

  return (
    <Link href={`/subjects/${subject.id}`} onClick={handleClick}>
      <Card className="hover:bg-accent transition-colors cursor-pointer h-full">
        <CardHeader>
          <div className="text-4xl mb-2">{subject.icon}</div>
          <CardTitle className="text-xl">{subject.name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  )
}
