# Школьный Справочник

Telegram Mini App — интерактивный справочник формул и определений для школьников.

## Технологии

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase
- react-katex
- shadcn/ui

## Установка

```powershell
# Установка зависимостей
bun install

# Настройка переменных окружения
copy .env.example .env.local
# Заполните .env.local своими данными

# Запуск dev сервера
bun run dev
```

## Структура проекта

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Корневой layout
│   ├── page.tsx           # Главная страница
│   └── globals.css        # Глобальные стили
├── components/
│   └── ui/                # shadcn/ui компоненты
├── lib/
│   ├── supabase.ts        # Supabase клиент
│   └── telegram.ts        # Telegram WebApp утилиты
├── docs/
│   └── PRD.md             # Техническое задание
└── .memory_bank/          # Документация проекта
```

## Команды

```powershell
bun run dev          # Запуск dev сервера
bun run build        # Сборка для продакшн
bun run start        # Запуск продакшн сервера
bun run lint         # Проверка кода через biome
bun run lint:fix     # Автоисправление кода
```

## Следующие шаги

1. Настроить Supabase (создать таблицы)
2. Заполнить тестовыми данными
3. Создать страницы приложения
4. Интегрировать с Telegram Bot

## Документация

- [PRD](docs/PRD.md) — Техническое задание
- [Memory Bank](.memory_bank/) — Документация проекта
