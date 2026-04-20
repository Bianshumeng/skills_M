interface HeaderProps {
  dark: boolean
  onToggle: () => void
}

export function Header({ dark, onToggle }: HeaderProps) {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-5 transition-[background-color,border-color,color] duration-200 dark:border-gray-800 dark:bg-[#242424]">
      <span className="text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-200">
        技能预选面板
      </span>
      <button
        type="button"
        onClick={onToggle}
        className="flex h-10 w-10 items-center justify-center rounded-md transition-[background-color,color,box-shadow] duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:hover:bg-gray-800 dark:focus-visible:ring-offset-[#242424]"
        aria-label={dark ? '切换到浅色主题' : '切换到深色主题'}
        aria-pressed={dark}
      >
        {dark ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </header>
  )
}
