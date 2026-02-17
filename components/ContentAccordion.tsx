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
      {formulas.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="text-2xl">📐</div>
            <h2 className="text-xl font-semibold">Формулы</h2>
          </div>
          <Accordion type="single">
            {formulas.map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                trigger={
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">
                      {index + 1}
                    </div>
                    <span>Формула {index + 1}</span>
                  </div>
                }
              >
                <div className="space-y-4 pt-2">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-5 rounded-xl border border-blue-200/50 dark:border-blue-800/50 overflow-x-auto shadow-sm">
                    {renderFormula(item.body)}
                  </div>
                  {item.example && (
                    <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200/50 dark:border-amber-800/50">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">💡</span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-1">Пример:</p>
                          <p className="text-sm text-amber-800 dark:text-amber-200">{item.example}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <CopyButton text={item.body} label="Скопировать формулу" />
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {definitions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="text-2xl">📚</div>
            <h2 className="text-xl font-semibold">Определения</h2>
          </div>
          <Accordion type="single">
            {definitions.map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                trigger={
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-600 dark:text-purple-400">
                      {index + 1}
                    </div>
                    <span>Определение {index + 1}</span>
                  </div>
                }
              >
                <div className="space-y-4 pt-2">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-5 rounded-xl border border-purple-200/50 dark:border-purple-800/50 shadow-sm">
                    <p className="text-base leading-relaxed">{item.body}</p>
                  </div>
                  {item.example && (
                    <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200/50 dark:border-amber-800/50">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">💡</span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-1">Пример:</p>
                          <p className="text-sm text-amber-800 dark:text-amber-200">{item.example}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <CopyButton text={item.body} />
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  )
}
