import type { Platform, Skill } from '../types'
import { platforms } from '../types'

interface SidebarProps {
  active: Platform
  skills: Record<Platform, Skill[]>
  onSelect: (p: Platform) => void
}

export function Sidebar({ active, skills, onSelect }: SidebarProps) {
  return (
    <nav className="w-56 shrink-0 border-r border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-[#1f1f1f] flex flex-col py-3">
      {platforms.map(p => {
        const isActive = p.id === active
        const count = skills[p.id].length
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className={`flex items-center gap-2.5 px-4 py-2.5 mx-2 rounded-md text-left text-sm transition-colors ${
              isActive
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: p.color }}
            />
            <span className="flex-1 truncate">{p.label}</span>
            <span className={`text-xs tabular-nums ${
              isActive ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
            }`}>
              {count}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
