import type { Skill } from '../types'

interface SkillRowProps {
  skill: Skill
  onToggle: (name: string) => void
}

export function SkillRow({ skill, onToggle }: SkillRowProps) {
  return (
    <div className="flex items-center gap-4 px-6 py-2.5 border-b border-gray-300 dark:border-gray-600 hover:bg-gray-50/50 dark:hover:bg-white/[0.03] transition-colors">
      <div className="flex-1 min-w-0">
        <span className="inline-block text-sm font-semibold font-mono text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">{skill.name}</span>
        <div className="text-sm text-gray-700 dark:text-gray-300 mt-0.5 truncate">{skill.description}</div>
      </div>
      <button
        onClick={() => onToggle(skill.name)}
        className={`relative w-9 h-5 rounded-full shrink-0 transition-colors ${
          skill.enabled
            ? 'bg-blue-500'
            : 'bg-gray-300 dark:bg-gray-600'
        }`}
        aria-label={skill.enabled ? '禁用' : '启用'}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
            skill.enabled ? 'translate-x-4' : ''
          }`}
        />
      </button>
    </div>
  )
}
