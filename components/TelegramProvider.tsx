'use client'

import { type TelegramWebApp, initTelegramWebApp } from '@/lib/telegram'
import { useEffect, useState } from 'react'

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [tg, setTg] = useState<TelegramWebApp | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const telegram = initTelegramWebApp()
    setTg(telegram)

    if (telegram) {
      // Применяем тему Telegram
      const isDark = telegram.colorScheme === 'dark'
      document.documentElement.classList.toggle('dark', isDark)

      // Применяем цвета темы Telegram
      if (telegram.themeParams.bg_color) {
        document.documentElement.style.setProperty(
          '--tg-theme-bg-color',
          telegram.themeParams.bg_color,
        )
      }
      if (telegram.themeParams.text_color) {
        document.documentElement.style.setProperty(
          '--tg-theme-text-color',
          telegram.themeParams.text_color,
        )
      }

      // Скрываем кнопку "Назад" Telegram
      telegram.BackButton?.hide()

      // Уведомляем Telegram что приложение готово
      telegram.ready()
      telegram.expand()
    }
  }, [])

  // Предотвращаем мерцание при загрузке
  if (!mounted) {
    return null
  }

  return <>{children}</>
}
