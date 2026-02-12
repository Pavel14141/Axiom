export interface Subject {
  id: string
  name: string
  icon: string
  created_at: string
}

export interface Topic {
  id: string
  subject_id: string
  title: string
  created_at: string
}

export interface Content {
  id: string
  topic_id: string
  type: 'definition' | 'formula'
  body: string
  example: string | null
  created_at: string
}

export interface TopicWithContent extends Topic {
  content: Content[]
}

export interface SubjectWithTopics extends Subject {
  topics: Topic[]
}
