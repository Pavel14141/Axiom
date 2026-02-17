import { BackButton } from '@/components/BackButton'
import { ContentAccordion } from '@/components/ContentAccordion'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import type { Content, Subject, Topic } from '@/lib/types'
import Link from 'next/link'

export const revalidate = 60

async function getTopicWithContent(id: string): Promise<{
  topic: Topic | null
  content: Content[]
  subject: Subject | null
}> {
  const { data: topic } = await supabase.from('topics').select('*').eq('id', id).single()

  const { data: content } = await supabase
    .from('content')
    .select('*')
    .eq('topic_id', id)
    .order('type')

  let subject = null
  if (topic) {
    const { data: subjectData } = await supabase
      .from('subjects')
      .select('*')
      .eq('id', topic.subject_id)
      .single()
    subject = subjectData
  }

  return {
    topic: topic || null,
    content: content || [],
    subject,
  }
}

export default async function TopicPage({ params }: { params: { id: string } }) {
  const { topic, content, subject } = await getTopicWithContent(params.id)

  if (!topic) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Тема не найдена</p>
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

  const gradient = subject ? subjectColors[subject.name] || 'from-gray-400 to-gray-500' : 'from-gray-400 to-gray-500'

  return (
    <div className="space-y-6 pb-6">
      {subject && (
        <BackButton href={`/subjects/${subject.id}`} label={`Назад к ${subject.name}`} />
      )}
      
      {/* Topic Header */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 text-white shadow-xl`}>
        <div className="relative z-10">
          <div className="text-4xl mb-3">📖</div>
          <h1 className="text-2xl font-bold mb-1 drop-shadow">{topic.title}</h1>
          {subject && <p className="text-white/90 text-sm">{subject.name}</p>}
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      </div>

      {content.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold mb-4 px-1">Материалы</h2>
          <ContentAccordion content={content} />
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">
          Контент для этой темы пока не добавлен
        </p>
      )}
    </div>
  )
}
