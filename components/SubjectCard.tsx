'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { getTelegramWebApp } from '@/lib/telegram'
import type { Subject } from '@/lib/types'
import Link from 'next/link'

interface SubjectCardProps {
  subject: Subject
}

const subjectColors: Record<string, string> = {
  'Физика': 'from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-500',
  'Алгебра': 'from-purple-400 to-pink-400 dark:from-purple-500 dark:to-pink-500',
  'Геометрия': 'from-orange-400 to-red-400 dark:from-orange-500 dark:to-red-500',
}

export function SubjectCard({ subject }: SubjectCardProps) {
  const handleClick = () => {
    const tg = getTelegramWebApp()
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred('light')
    }
  }

  const gradient = subjectColors[subject.name] || 'from-gray-400 to-gray-500'

  return (
    <Link href={`/subjects/${subject.id}`} onClick={handleClick}>
      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer h-full">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />
        <CardHeader className="relative z-10 text-white">
          <div className="text-5xl mb-3 drop-shadow-lg">{subject.icon}</div>
          <CardTitle className="text-xl font-bold drop-shadow">{subject.name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  )
}
