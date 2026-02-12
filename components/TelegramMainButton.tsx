'use client'

import { getTelegramWebApp } from '@/lib/telegram'
import { useEffect } from 'react'

interface TelegramMainButtonProps {
  text: string
  onClick: () => void
  disabled?: boolean
}

export function TelegramMainButton({ text, onClick, disabled = false }: TelegramMainButtonProps) {
  useEffect(() => {
    const tg = getTelegramWebApp()
    if (!tg?.MainButton) return

    tg.MainButton.setText(text)
    tg.MainButton.show()

    if (disabled) {
      tg.MainButton.disable()
    } else {
      tg.MainButton.enable()
    }

    const handleClick = () => {
      if (!disabled) {
        onClick()
      }
    }

    tg.MainButton.onClick(handleClick)

    return () => {
      tg.MainButton.hide()
    }
  }, [text, onClick, disabled])

  return null
}
