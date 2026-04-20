export const platforms = [
  { id: 'claude-code', label: 'Claude Code 技能', dotClassName: 'bg-amber-500' },
  { id: 'codex', label: 'Codex 技能', dotClassName: 'bg-emerald-500' },
  { id: 'gemini-cli', label: 'Gemini CLI 技能', dotClassName: 'bg-indigo-500' },
] as const

export type Platform = (typeof platforms)[number]['id']
export type PlatformInfo = (typeof platforms)[number]
