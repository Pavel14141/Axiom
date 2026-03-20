# System Patterns

## Архитектура приложения

### Frontend Architecture

```
Next.js App Router
├── app/
│   ├── page.tsx (главная - список предметов)
│   ├── subjects/[id]/page.tsx (список тем)
│   └── topics/[id]/page.tsx (контент темы)
├── components/
│   ├── ui/ (shadcn/ui компоненты)
│   ├── SubjectCard.tsx
│   ├── TopicList.tsx
│   └── ContentAccordion.tsx
└── lib/
    └── supabase.ts (клиент)
```

### Backend Architecture

**Supabase** — Backend as a Service
- PostgreSQL база данных
- REST API (автогенерируемый)
- Row Level Security для защиты данных

### Data Flow

```
User → Next.js Page → Supabase Client → Supabase API → PostgreSQL
```

## Ключевые паттерны

### 1. Server Components (по умолчанию)
Использовать Server Components для страниц с данными из Supabase

### 2. Client Components (где нужна интерактивность)
- Поисковая строка
- Кнопки избранного
- Accordion с контентом

### 3. API Routes (опционально)
Для сложной логики или кеширования можно использовать Next.js API Routes

### 4. Telegram Integration
```typescript
// Инициализация Telegram WebApp
if (typeof window !== 'undefined') {
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
}
```

## Связи между модулями

- **Subjects** → **Topics** (one-to-many)
- **Topics** → **Content** (one-to-many)
- **Content** имеет type: 'definition' | 'formula'

## Безопасность

- Telegram InitData для аутентификации
- RLS политики в Supabase для защиты данных
- Environment variables для секретов
