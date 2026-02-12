'use client'

import { Button } from '@/components/ui/button'
import { getTelegramWebApp } from '@/lib/telegram'
import { useState } from 'react'

interface CopyButtonProps {
  text: string
  label?: string
}

export function CopyButton({ text, label = 'Скопировать' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)

      // Haptic feedback
      const tg = getTelegramWebApp()
      if (tg?.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred('success')
      }

      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <Button size="sm" variant="outline" onClick={handleCopy} disabled={copied}>
      {copied ? '✓ Скопировано' : label}
    </Button>
  )
}
