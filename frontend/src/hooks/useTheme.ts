import { useEffect, useState } from 'react'

type ThemePreference = 'dark' | 'light' | 'system'

const THEME_STORAGE_KEY = 'theme'

function getSystemDarkMode() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function getStoredPreference(): ThemePreference {
  if (typeof window === 'undefined') return 'system'

  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    return saved === 'dark' || saved === 'light' ? saved : 'system'
  } catch {
    return 'system'
  }
}

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(getStoredPreference)
  const [systemDark, setSystemDark] = useState(getSystemDarkMode)
  const dark = preference === 'system' ? systemDark : preference === 'dark'

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
  }, [dark])

  useEffect(() => {
    try {
      if (preference === 'system') {
        localStorage.removeItem(THEME_STORAGE_KEY)
      } else {
        localStorage.setItem(THEME_STORAGE_KEY, preference)
      }
    } catch {
      return
    }
  }, [preference])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (event: MediaQueryListEvent) => setSystemDark(event.matches)

    setSystemDark(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return {
    dark,
    toggle: () => {
      setPreference(currentPreference => {
        const resolvedDark =
          currentPreference === 'system' ? systemDark : currentPreference === 'dark'

        return resolvedDark ? 'light' : 'dark'
      })
    },
  }
}
