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

  return (
    <div className="space-y-6">
      <div>
        {subject && (
          <BackButton href={`/subjects/${subject.id}`} label={`Назад к ${subject.name}`} />
        )}
        <h1 className="text-3xl font-bold mb-2">{topic.title}</h1>
        {subject && <p className="text-muted-foreground">{subject.name}</p>}
      </div>

      {content.length > 0 ? (
        <ContentAccordion content={content} />
      ) : (
        <p className="text-center text-muted-foreground py-8">
          Контент для этой темы пока не добавлен
        </p>
      )}
    </div>
  )
}
