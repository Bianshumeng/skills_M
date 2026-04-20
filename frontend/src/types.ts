import type { Platform } from './data/platforms'

export type { Platform, PlatformInfo } from './data/platforms'

export interface Skill {
  id: string
  name: string
  description: string
}

export interface SkillGroup {
  category: string
  skills: Skill[]
}

export type SkillsByPlatform = Record<Platform, SkillGroup[]>
