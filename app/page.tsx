import { SearchBar } from '@/components/SearchBar'
import { SubjectCard } from '@/components/SubjectCard'
import { supabase } from '@/lib/supabase'
import type { Subject, Topic } from '@/lib/types'

export const revalidate = 60

async function getData(): Promise<{ subjects: Subject[]; topics: Topic[] }> {
  const { data: subjects } = await supabase.from('subjects').select('*').order('name')

  const { data: topics } = await supabase.from('topics').select('*')

  return {
    subjects: subjects || [],
    topics: topics || [],
  }
}

export default async function Home() {
  const { subjects, topics } = await getData()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Школьный Справочник</h1>
        <p className="text-muted-foreground">Выберите предмет для изучения</p>
      </div>

      <SearchBar topics={topics} />

      <div className="grid grid-cols-2 gap-4">
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>

      {subjects.length === 0 && (
        <p className="text-center text-muted-foreground py-8">Предметы пока не добавлены</p>
      )}
    </div>
  )
}
