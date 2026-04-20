import { useEffect, useState } from 'react'
import type { Skill } from '../types'

interface SkillRowProps {
  skill: Skill
  sequence: number
  triggerPrefix: string
}

async function copySkillTrigger(trigger: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(trigger)
    return
  }

  if (typeof document === 'undefined') {
    throw new Error('Clipboard unavailable')
  }

  const textarea = document.createElement('textarea')
  textarea.value = trigger
  textarea.setAttribute('readonly', 'true')
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)

  try {
    textarea.focus()
    textarea.select()
    textarea.setSelectionRange(0, textarea.value.length)

    const copied = document.execCommand('copy')
    if (!copied) {
      throw new Error('Fallback copy failed')
    }
  } finally {
    document.body.removeChild(textarea)
  }
}

export function SkillRow({ skill, sequence, triggerPrefix }: SkillRowProps) {
  const [copied, setCopied] = useState(false)
  const trigger = `${triggerPrefix}${skill.name}`

  useEffect(() => {
    if (!copied) return

    const timer = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timer)
  }, [copied])

  const handleCopy = async () => {
    try {
      await copySkillTrigger(trigger)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <li className="border-b border-gray-300 px-4 py-3 transition-[background-color,border-color,color] duration-200 hover:bg-gray-50/50 dark:border-gray-600 dark:hover:bg-white/[0.03] sm:px-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold tabular-nums text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {sequence}
        </span>
        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex max-w-full items-center gap-2 rounded bg-blue-50 px-2 py-0.5 text-left font-mono text-sm font-semibold text-blue-700 transition-[background-color,color,box-shadow] duration-200 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 dark:focus-visible:ring-offset-[#1c1c1c]"
            aria-label={`复制技能触发词 ${trigger}`}
          >
            <span className="break-all">{trigger}</span>
            <span
              aria-hidden="true"
              className={`inline-flex h-4 w-4 items-center justify-center text-emerald-500 transition-opacity duration-200 ${copied ? 'opacity-100' : 'opacity-0'}`}
            >
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                <path
                  d="M3.5 8.5 6.5 11.5 12.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          {copied ? (
            <span className="ml-2 inline-flex text-xs font-medium text-emerald-600 dark:text-emerald-400">
              已复制
            </span>
          ) : null}
        </div>
      </div>
      <div className="mt-1 pl-10 sm:pl-11">
        <div
          className="mt-1 break-words text-sm leading-6 text-gray-700 dark:text-gray-200 md:truncate"
        >
          {skill.description}
        </div>
      </div>
    </li>
  )
}
