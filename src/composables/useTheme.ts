import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const theme = ref<Theme>('light')
let initialized = false
let userOverridden = false // 用户是否手动切换过（手动后不再跟随系统）

const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const applyTheme = (t: Theme) => {
  document.documentElement.setAttribute('data-theme', t)
  // 同步浏览器地址栏主题色
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', t === 'dark' ? '#005375' : '#eaf2f5')
}

/**
 * 初始化主题：localStorage 优先，否则跟随系统偏好。
 * 在 index.html 内联脚本已提前设置过 data-theme，这里负责同步状态与监听。
 */
export const initTheme = () => {
  if (initialized) return
  initialized = true

  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (stored === 'light' || stored === 'dark') {
    theme.value = stored
    userOverridden = true
  } else {
    theme.value = getSystemTheme()
  }
  applyTheme(theme.value)

  // 仅当用户未手动覆盖时，跟随系统变化
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (userOverridden) return
      theme.value = e.matches ? 'dark' : 'light'
    })

  watch(theme, (t) => applyTheme(t))
}

/** 手动切换主题（会持久化并停止跟随系统） */
export const toggleTheme = () => {
  userOverridden = true
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem(STORAGE_KEY, theme.value)
}

/** 恢复跟随系统（清除 localStorage 覆盖） */
export const followSystem = () => {
  userOverridden = false
  localStorage.removeItem(STORAGE_KEY)
  theme.value = getSystemTheme()
}

export const useTheme = () => {
  if (!initialized) initTheme()
  return { theme, toggleTheme, followSystem }
}
