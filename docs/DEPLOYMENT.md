# Инструкция по деплою

## Шаг 1: Подготовка к деплою

### Проверка переменных окружения

Убедись, что в `.env.local` заполнены все необходимые переменные:

```env
NEXT_PUBLIC_SUPABASE_URL=https://epovvtvhpaugyxsfacyw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Шаг 2: Деплой на Vercel

### Вариант 1: Через Vercel CLI (рекомендуется)

```powershell
# Установка Vercel CLI
npm install -g vercel

# Логин в Vercel
vercel login

# Деплой проекта
vercel

# Для продакшн деплоя
vercel --prod
```

### Вариант 2: Через GitHub

1. Запуш проект на GitHub
2. Зайди на [vercel.com](https://vercel.com)
3. Нажми "Import Project"
4. Выбери свой репозиторий
5. Настрой переменные окружения:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Нажми "Deploy"

### Настройка переменных окружения в Vercel

В настройках проекта на Vercel добавь:

```
NEXT_PUBLIC_SUPABASE_URL = https://epovvtvhpaugyxsfacyw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_anon_key_here
```

## Шаг 3: Создание Telegram бота

### 3.1. Создание бота через BotFather

1. Открой [@BotFather](https://t.me/BotFather) в Telegram
2. Отправь команду `/newbot`
3. Введи имя бота (например: "Школьный Справочник")
4. Введи username бота (например: "school_reference_bot")
5. Сохрани токен бота (понадобится для будущих интеграций)

### 3.2. Настройка описания и команд

```
/setdescription - Установить описание бота
Интерактивный справочник формул и определений для школьников

/setabouttext - Установить текст "О боте"
Справочник содержит формулы и определения по физике, алгебре и геометрии

/setuserpic - Загрузить аватар бота
```

### 3.3. Создание Web App

1. Отправь `/newapp` в BotFather
2. Выбери своего бота
3. Введи название приложения: "Справочник"
4. Введи описание: "Формулы и определения"
5. Загрузи иконку (512x512 px)
6. Введи URL приложения (твой Vercel URL):
   ```
   https://your-project.vercel.app
   ```

### 3.4. Настройка кнопки запуска

После создания Web App, настрой кнопку меню:

```
/setmenubutton
Выбери бота
Введи текст кнопки: "Открыть справочник"
Введи URL: https://your-project.vercel.app
```

## Шаг 4: Тестирование

1. Открой своего бота в Telegram
2. Нажми на кнопку "Открыть справочник" или используй команду `/start`
3. Проверь:
   - ✅ Приложение открывается
   - ✅ Тема адаптируется под Telegram
   - ✅ Haptic feedback работает
   - ✅ Данные загружаются из Supabase
   - ✅ Поиск работает
   - ✅ Формулы отображаются корректно
   - ✅ Копирование работает

## Шаг 5: Настройка домена (опционально)

### В Vercel:
1. Перейди в настройки проекта
2. Domains → Add Domain
3. Введи свой домен
4. Настрой DNS записи согласно инструкциям

### В BotFather:
Обнови URL приложения на свой домен:
```
/editapp
Выбери бота → Выбери приложение
Edit URL → https://your-domain.com
```

## Troubleshooting

### Проблема: Приложение не открывается в Telegram

**Решение:**
- Проверь, что URL в BotFather правильный
- Убедись, что сайт доступен по HTTPS
- Проверь консоль браузера на ошибки

### Проблема: Данные не загружаются

**Решение:**
- Проверь переменные окружения в Vercel
- Убедись, что Supabase URL и ключ правильные
- Проверь RLS политики в Supabase

### Проблема: Формулы не отображаются

**Решение:**
- Проверь, что katex.min.css загружается
- Убедись, что формулы в базе данных в правильном формате LaTeX

## Полезные команды

```powershell
# Локальная сборка для проверки
bun run build
bun run start

# Проверка линтинга перед деплоем
bun run lint

# Просмотр логов Vercel
vercel logs
```

## Дополнительные настройки

### Analytics (опционально)

Добавь Vercel Analytics:
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Speed Insights (опционально)

```powershell
bun add @vercel/speed-insights

# В layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'
```

## Мониторинг

После деплоя следи за:
- Vercel Dashboard → Analytics
- Vercel Dashboard → Speed Insights
- Supabase Dashboard → Database → Usage

## Обновление приложения

```powershell
# После внесения изменений
git add .
git commit -m "Update: описание изменений"
git push

# Vercel автоматически задеплоит изменения
# Или вручную через CLI
vercel --prod
```
