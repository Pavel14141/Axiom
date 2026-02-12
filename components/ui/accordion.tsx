'use client'

import * as React from 'react'

interface AccordionItemProps {
  value: string
  trigger: React.ReactNode
  children: React.ReactNode
}

interface AccordionProps {
  type?: 'single' | 'multiple'
  children: React.ReactNode
  defaultValue?: string | string[]
}

const AccordionContext = React.createContext<{
  openItems: Set<string>
  toggleItem: (value: string) => void
}>({
  openItems: new Set(),
  toggleItem: () => {},
})

export function Accordion({ type = 'single', children, defaultValue }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(() => {
    if (defaultValue) {
      return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue])
    }
    return new Set()
  })

  const toggleItem = (value: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(value)) {
        newSet.delete(value)
      } else {
        if (type === 'single') {
          newSet.clear()
        }
        newSet.add(value)
      }
      return newSet
    })
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className="space-y-2">{children}</div>
    </AccordionContext.Provider>
  )
}

export function AccordionItem({ value, trigger, children }: AccordionItemProps) {
  const { openItems, toggleItem } = React.useContext(AccordionContext)
  const isOpen = openItems.has(value)

  return (
    <div className="border rounded-lg">
      <button
        className="flex w-full items-center justify-between p-4 text-left font-medium hover:bg-accent"
        onClick={() => toggleItem(value)}
        type="button"
      >
        {trigger}
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="p-4 pt-0">{children}</div>}
    </div>
  )
}
