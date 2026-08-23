import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: Theme
  toggleTheme: () => void
}

const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem('sprintdesk-theme')

  if (saved === 'dark' || saved === 'light') {
    return saved
  }

  return 'light'
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: getInitialTheme(),

  toggleTheme: () => {
    set((state) => {
      const nextTheme =
        state.theme === 'light' ? 'dark' : 'light'

      localStorage.setItem(
        'sprintdesk-theme',
        nextTheme,
      )

      document.documentElement.classList.toggle(
        'dark',
        nextTheme === 'dark',
      )

      return { theme: nextTheme }
    })
  },
}))