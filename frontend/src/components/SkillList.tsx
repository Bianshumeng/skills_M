import type { Platform, SkillGroup } from '../types'
import { platforms } from '../data/platforms'
import { SkillRow } from './SkillRow'

interface SkillListProps {
  platform: Platform
  groups: SkillGroup[]
}

export function SkillList({ platform, groups }: SkillListProps) {
  const info = platforms.find(p => p.id === platform)
  if (!info) return <div className="flex-1 p-6">未知平台</div>
  const headingId = `${platform}-heading`
  const totalSkills = groups.reduce((sum, g) => sum + g.skills.length, 0)
  const triggerPrefix = platform === 'codex' ? '$' : '/'

  return (
    <main className="min-h-0 flex-1 overflow-y-auto" aria-labelledby={headingId}>
      <div className="border-b border-gray-200 px-4 py-4 transition-[border-color,color] duration-200 dark:border-gray-800/60 sm:px-6">
        <h1 id={headingId} className="text-base font-medium text-gray-800 dark:text-gray-100">
          {info.label}
        </h1>
        <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-300">
          共 {totalSkills} 个技能
        </p>
      </div>
      {groups.length === 0 ? (
        <p className="px-6 py-10 text-center text-sm text-gray-600 dark:text-gray-300">
          暂无技能
        </p>
      ) : (
        groups.map((group, idx) => {
          const bgColors = [
            'bg-blue-50/50 dark:bg-blue-950/15',
            'bg-amber-50/50 dark:bg-amber-950/15',
            'bg-emerald-50/50 dark:bg-emerald-950/15',
            'bg-purple-50/50 dark:bg-purple-950/15',
          ]
          const bg = bgColors[idx % bgColors.length]
          const titleColors = [
            'text-blue-700 dark:text-blue-300',
            'text-amber-700 dark:text-amber-300',
            'text-emerald-700 dark:text-emerald-300',
            'text-purple-700 dark:text-purple-300',
          ]
          const lineColors = [
            'bg-blue-300 dark:bg-blue-700',
            'bg-amber-300 dark:bg-amber-700',
            'bg-emerald-300 dark:bg-emerald-700',
            'bg-purple-300 dark:bg-purple-700',
          ]
          return (
            <section
              key={group.category}
              aria-label={group.category}
              className={bg}
            >
              <div className={`flex items-center gap-3 px-4 sm:px-6 ${idx === 0 ? 'pt-5 pb-3' : 'pt-7 pb-3'}`}>
                <h2 className={`shrink-0 text-sm font-semibold ${titleColors[idx % titleColors.length]}`}>
                  {group.category}
                </h2>
                <div className={`h-px flex-1 ${lineColors[idx % lineColors.length]}`} />
              </div>
              <ul role="list" className="m-0 list-none p-0">
                {group.skills.map((skill, skillIndex) => (
                  <SkillRow
                    key={skill.id}
                    skill={skill}
                    sequence={skillIndex + 1}
                    triggerPrefix={triggerPrefix}
                  />
                ))}
              </ul>
            </section>
          )
        })
      )}
    </main>
  )
}
