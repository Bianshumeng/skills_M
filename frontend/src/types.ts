export interface Skill {
  name: string
  description: string
  enabled: boolean
}

export type Platform = 'claude-code' | 'codex' | 'gemini-cli'

export interface PlatformInfo {
  id: Platform
  label: string
  color: string
}

export const platforms: PlatformInfo[] = [
  { id: 'claude-code', label: 'Claude Code 技能', color: '#f59e0b' },
  { id: 'codex', label: 'Codex 技能', color: '#10b981' },
  { id: 'gemini-cli', label: 'Gemini CLI 技能', color: '#6366f1' },
]
