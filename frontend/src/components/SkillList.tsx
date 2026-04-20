import type { Platform, Skill } from '../types'
import { platforms } from '../types'
import { SkillRow } from './SkillRow'

interface SkillListProps {
  platform: Platform
  skills: Skill[]
  onToggle: (name: string) => void
}

export function SkillList({ platform, skills, onToggle }: SkillListProps) {
  const info = platforms.find(p => p.id === platform)!
  const enabledCount = skills.filter(s => s.enabled).length

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800/60">
        <h1 className="text-base font-medium text-gray-800 dark:text-gray-100">{info.label}</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          共 {skills.length} 个技能，已启用 {enabledCount} 个
        </p>
      </div>
      <div>
        {skills.map(skill => (
          <SkillRow key={skill.name} skill={skill} onToggle={onToggle} />
        ))}
      </div>
    </main>
  )
}
