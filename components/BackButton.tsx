'use client'

import { Button } from '@/components/ui/button'
import { getTelegramWebApp } from '@/lib/telegram'
import Link from 'next/link'
import { useEffect } from 'react'

interface BackButtonProps {
  href: string
  label: string
}

export function BackButton({ href, label }: BackButtonProps) {
  const handleClick = () => {
    const tg = getTelegramWebApp()
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred('light')
    }
  }

  return (
    <Link href={href}>
      <Button variant="ghost" size="sm" className="mb-4" onClick={handleClick}>
        ← {label}
      </Button>
    </Link>
  )
}
