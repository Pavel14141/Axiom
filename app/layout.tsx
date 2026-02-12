import type { Metadata } from 'next'
import './globals.css'
import 'katex/dist/katex.min.css'
import { TelegramProvider } from '@/components/TelegramProvider'

export const metadata: Metadata = {
  title: 'Школьный Справочник',
  description: 'Интерактивный справочник формул и определений',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async />
      </head>
      <body>
        <TelegramProvider>
          <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-6 max-w-4xl">{children}</main>
          </div>
        </TelegramProvider>
      </body>
    </html>
  )
}
