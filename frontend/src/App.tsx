import { useState } from 'react'
import { useTheme } from './hooks/useTheme'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { SkillList } from './components/SkillList'
import { skills as initialSkills } from './data/skills'
import type { Platform, Skill } from './types'

export default function App() {
  const theme = useTheme()
  const [active, setActive] = useState<Platform>('claude-code')
  const [skills, setSkills] = useState(initialSkills)

  const handleToggle = (name: string) => {
    setSkills(prev => ({
      ...prev,
      [active]: prev[active].map((s: Skill) =>
        s.name === name ? { ...s, enabled: !s.enabled } : s
      ),
    }))
  }

  return (
    <div className="h-screen flex flex-col bg-white text-gray-900 dark:bg-[#1c1c1c] dark:text-gray-100">
      <Header dark={theme.dark} onToggle={theme.toggle} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar active={active} skills={skills} onSelect={setActive} />
        <SkillList platform={active} skills={skills[active]} onToggle={handleToggle} />
      </div>
    </div>
  )
}
