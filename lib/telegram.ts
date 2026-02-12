export interface TelegramWebApp {
  ready: () => void
  expand: () => void
  close: () => void
  BackButton?: {
    show: () => void
    hide: () => void
    onClick: (callback: () => void) => void
  }
  MainButton: {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isActive: boolean
    show: () => void
    hide: () => void
    onClick: (callback: () => void) => void
    setText: (text: string) => void
    enable: () => void
    disable: () => void
  }
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void
    selectionChanged: () => void
  }
  themeParams: {
    bg_color?: string
    text_color?: string
    hint_color?: string
    link_color?: string
    button_color?: string
    button_text_color?: string
    secondary_bg_color?: string
  }
  colorScheme: 'light' | 'dark'
  initData: string
  initDataUnsafe: {
    user?: {
      id: number
      first_name: string
      last_name?: string
      username?: string
      language_code?: string
    }
  }
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

export const getTelegramWebApp = (): TelegramWebApp | null => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    return window.Telegram.WebApp
  }
  return null
}

export const initTelegramWebApp = () => {
  const tg = getTelegramWebApp()
  if (tg) {
    tg.ready()
    tg.expand()
  }
  return tg
}

export const useTelegramTheme = () => {
  const tg = getTelegramWebApp()
  return {
    colorScheme: tg?.colorScheme || 'light',
    themeParams: tg?.themeParams || {},
  }
}
