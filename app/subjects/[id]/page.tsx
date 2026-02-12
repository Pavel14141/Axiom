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

  return (
    <div className="space-y-6">
      <div>
        <BackButton href="/" label="Назад" />
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{subject.icon}</span>
          <h1 className="text-3xl font-bold">{subject.name}</h1>
        </div>
        <p className="text-muted-foreground">Выберите тему для изучения</p>
      </div>

      {topics.length > 0 ? (
        <TopicList topics={topics} />
      ) : (
        <p className="text-center text-muted-foreground py-8">
          Темы для этого предмета пока не добавлены
        </p>
      )}
    </div>
  )
}
