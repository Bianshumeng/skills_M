import type { Platform } from '../types'
import { platforms } from '../data/platforms'

interface SidebarProps {
  active: Platform
  counts: Record<Platform, number>
  onSelect: (p: Platform) => void
}

export function Sidebar({ active, counts, onSelect }: SidebarProps) {
  return (
    <nav
      className="border-b border-gray-200 bg-gray-50/60 transition-[background-color,border-color,color] duration-200 dark:border-gray-800 dark:bg-[#1f1f1f] md:w-56 md:shrink-0 md:border-b-0 md:border-r"
      aria-label="平台导航"
    >
      <ul className="m-0 flex list-none gap-2 overflow-x-auto px-3 py-3 md:flex-col md:gap-1 md:overflow-visible">
        {platforms.map(platform => {
          const isActive = platform.id === active
          const count = counts[platform.id]

          return (
            <li key={platform.id} className="min-w-0">
              <button
                type="button"
                onClick={() => onSelect(platform.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex min-h-[44px] w-full min-w-[11rem] items-center gap-2.5 rounded-md px-4 py-2.5 text-left text-sm transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#1f1f1f] md:min-w-0 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/50'
                }`}
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${platform.dotClassName}`}
                  aria-hidden="true"
                />
                <span className="flex-1 break-words">{platform.label}</span>
                <span
                  className={`text-xs tabular-nums ${
                    isActive
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
