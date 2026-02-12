'use client'

import { CopyButton } from '@/components/CopyButton'
import { Accordion, AccordionItem } from '@/components/ui/accordion'
import type { Content } from '@/lib/types'
import { BlockMath } from 'react-katex'

interface ContentAccordionProps {
  content: Content[]
}

export function ContentAccordion({ content }: ContentAccordionProps) {
  const definitions = content.filter((c) => c.type === 'definition')
  const formulas = content.filter((c) => c.type === 'formula')

  const renderFormula = (formula: string) => {
    try {
      // Проверяем, содержит ли формула LaTeX команды
      if (formula.includes('\\') || formula.includes('^') || formula.includes('_')) {
        return <BlockMath math={formula} />
      }
      return <div className="text-lg font-mono">{formula}</div>
    } catch {
      return <div className="text-lg font-mono">{formula}</div>
    }
  }

  return (
    <div className="space-y-6">
      {definitions.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Определения</h2>
          <Accordion type="single">
            {definitions.map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                trigger={<span>Определение {index + 1}</span>}
              >
                <div className="space-y-3">
                  <p className="text-sm">{item.body}</p>
                  {item.example && (
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm text-muted-foreground">
                        <strong>Пример:</strong> {item.example}
                      </p>
                    </div>
                  )}
                  <CopyButton text={item.body} />
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {formulas.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Формулы</h2>
          <Accordion type="single">
            {formulas.map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                trigger={<span>Формула {index + 1}</span>}
              >
                <div className="space-y-3">
                  <div className="bg-muted p-4 rounded-md overflow-x-auto">
                    {renderFormula(item.body)}
                  </div>
                  {item.example && (
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm text-muted-foreground">
                        <strong>Пример:</strong> {item.example}
                      </p>
                    </div>
                  )}
                  <CopyButton text={item.body} label="Скопировать формулу" />
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  )
}
