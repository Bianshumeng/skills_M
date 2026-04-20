import { useState } from 'react'
import { useTheme } from './hooks/useTheme'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { SkillList } from './components/SkillList'
import { skills as initialSkills } from './data/skills'
import { platforms } from './data/platforms'
import type { Platform } from './types'

export default function App() {
  const theme = useTheme()
  const [active, setActive] = useState<Platform>('claude-code')
  const skills = initialSkills

  const skillCounts = Object.fromEntries(
    platforms.map(platform => [
      platform.id,
      skills[platform.id].reduce((sum, g) => sum + g.skills.length, 0),
    ])
  ) as Record<Platform, number>

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors duration-200 dark:bg-[#1c1c1c] dark:text-gray-100">
      <Header dark={theme.dark} onToggle={theme.toggle} />
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <Sidebar active={active} counts={skillCounts} onSelect={setActive} />
        <SkillList platform={active} groups={skills[active]} />
      </div>
    </div>
  )
}
