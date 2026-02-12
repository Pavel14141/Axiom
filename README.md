# Школьный Справочник

Telegram Mini App — интерактивный справочник формул и определений для школьников.

## Технологии

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase
- react-katex
- Telegram WebApp SDK

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
│   ├── layout.tsx         # Корневой layout с Telegram интеграцией
│   ├── page.tsx           # Главная страница (список предметов)
│   ├── subjects/[id]/     # Страница списка тем
│   └── topics/[id]/       # Страница контента темы
├── components/
│   ├── ui/                # shadcn/ui компоненты
│   ├── SubjectCard.tsx    # Карточка предмета
│   ├── TopicList.tsx      # Список тем
│   ├── ContentAccordion.tsx # Аккордеон с контентом
│   ├── SearchBar.tsx      # Поиск по темам
│   ├── BackButton.tsx     # Кнопка назад с haptic
│   ├── CopyButton.tsx     # Кнопка копирования
│   └── TelegramProvider.tsx # Telegram интеграция
├── lib/
│   ├── supabase.ts        # Supabase клиент
│   ├── telegram.ts        # Telegram WebApp утилиты
│   └── types.ts           # TypeScript типы
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

## Интеграция с Telegram

### 1. Создание бота

1. Открой [@BotFather](https://t.me/BotFather) в Telegram
2. Отправь `/newbot` и следуй инструкциям
3. Сохрани токен бота

### 2. Настройка WebApp

1. Отправь `/newapp` в BotFather
2. Выбери своего бота
3. Укажи URL приложения (после деплоя на Vercel)
4. Загрузи иконку и описание

### 3. Деплой на Vercel

```powershell
# Установи Vercel CLI
npm i -g vercel

# Деплой
vercel

# Для продакшн
vercel --prod
```

После деплоя укажи URL в BotFather через `/setmenubutton`

Подробные инструкции:
- [Деплой](docs/DEPLOYMENT.md)
- [Настройка Telegram](docs/TELEGRAM_SETUP.md)

## Особенности

- Адаптивная тема (светлая/темная) из Telegram
- Haptic feedback при взаимодействии
- Рендеринг математических формул через LaTeX
- Живой поиск по темам
- Копирование формул в буфер обмена
- Полная интеграция с Telegram WebApp API

## База данных

Структура Supabase:
- `subjects` - предметы (Физика, Алгебра, Геометрия)
- `topics` - темы по предметам
- `content` - формулы и определения

## Документация

- [PRD](docs/PRD.md) — Техническое задание
- [Memory Bank](.memory_bank/) — Документация проекта
