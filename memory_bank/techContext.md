# Tech Context

## Технологический стек

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Card, Input, Button, Accordion, Tabs)
- **Formula Rendering**: react-katex
- **Telegram Integration**: @twa-dev/sdk или прямое использование Telegram WebApp API

### Backend
- **BaaS**: Supabase
  - PostgreSQL database
  - Auto-generated REST API
  - Real-time subscriptions (опционально)
  - Row Level Security

### Authentication
- NextAuth.js с Telegram provider
- Telegram InitData для автоматического входа

### Deployment
- **Hosting**: Vercel
- **Database**: Supabase Cloud (free tier)

## Пакетный менеджер

**bun** — используется для всех операций с зависимостями

## Инструменты разработки

### Линтинг и форматирование
- **biome** — для проверки и автоматического исправления кода

### Команды
```powershell
bun install          # Установка зависимостей
bun run dev          # Запуск dev сервера
bun run build        # Сборка продакшн версии
bun run lint         # Проверка кода через biome
```

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# NextAuth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Telegram
TELEGRAM_BOT_TOKEN=
```

## Ограничения окружения

- Windows + PowerShell
- Supabase free tier (500MB database, 2GB bandwidth)
- Vercel free tier (100GB bandwidth)

## CI/CD

Пока не настроен. Планируется:
- Vercel автоматический деплой из main ветки
- Preview deployments для PR

## Известные зависимости

```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.0.0",
  "@supabase/supabase-js": "^2.0.0",
  "next-auth": "^4.0.0",
  "react-katex": "^3.0.0",
  "katex": "^0.16.0"
}
```
