import { BackButton } from '@/components/BackButton'
import { TopicList } from '@/components/TopicList'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import type { Subject, Topic } from '@/lib/types'
import Link from 'next/link'

export const revalidate = 60

async function getSubjectWithTopics(id: string): Promise<{
  subject: Subject | null
  topics: Topic[]
}> {
  const { data: subject } = await supabase.from('subjects').select('*').eq('id', id).single()

  const { data: topics } = await supabase
    .from('topics')
    .select('*')
    .eq('subject_id', id)
    .order('title')

  return {
    subject: subject || null,
    topics: topics || [],
  }
}

export default async function SubjectPage({ params }: { params: { id: string } }) {
  const { subject, topics } = await getSubjectWithTopics(params.id)

  if (!subject) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Предмет не найден</p>
        <Link href="/">
          <Button>Вернуться на главную</Button>
        </Link>
      </div>
    )
  }

  const subjectColors: Record<string, string> = {
    'Физика': 'from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-500',
    'Алгебра': 'from-purple-400 to-pink-400 dark:from-purple-500 dark:to-pink-500',
    'Геометрия': 'from-orange-400 to-red-400 dark:from-orange-500 dark:to-red-500',
  }

  const gradient = subjectColors[subject.name] || 'from-gray-400 to-gray-500'

  return (
    <div className="space-y-6 pb-6">
      <BackButton href="/" label="Назад" />
      
      {/* Subject Header */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 text-white shadow-xl`}>
        <div className="relative z-10">
          <div className="text-5xl mb-3 drop-shadow-lg">{subject.icon}</div>
          <h1 className="text-3xl font-bold mb-1 drop-shadow">{subject.name}</h1>
          <p className="text-white/90 text-sm">{topics.length} {topics.length === 1 ? 'тема' : topics.length < 5 ? 'темы' : 'тем'}</p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      </div>

      {topics.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold mb-4 px-1">Темы</h2>
          <TopicList topics={topics} />
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">
          Темы для этого предмета пока не добавлены
        </p>
      )}
    </div>
  )
}
