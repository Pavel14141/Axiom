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
    <div className="space-y-8 pb-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 p-8 text-white shadow-xl">
        <div className="relative z-10">
          <div className="text-5xl mb-3">📚</div>
          <h1 className="text-3xl font-bold mb-2">Школьный Справочник</h1>
          <p className="text-white/90 text-sm">Формулы и определения всегда под рукой</p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      </div>

      <SearchBar topics={topics} />

      {/* Subjects Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4 px-1">Предметы</h2>
        <div className="grid grid-cols-2 gap-4">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </div>

      {subjects.length === 0 && (
        <p className="text-center text-muted-foreground py-8">Предметы пока не добавлены</p>
      )}
    </div>
  )
}
