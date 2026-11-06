<template>
  <div class="header_bar">
    <img src="/common/goback_logo.webp" alt="告白话剧社" />
    <div class="header_text_box">
      <div class="header_text_cn">告白话剧社</div>
      <div class="header_text_en">GoBack Drama Theater</div>
    </div>
    <button
      class="theme_toggle"
      type="button"
      :aria-label="theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'"
      @click="toggleTheme"
    >
      <!-- 月亮（深色模式下显示） -->
      <svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        />
      </svg>
      <!-- 太阳（浅色模式下显示） -->
      <svg v-else viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <circle cx="12" cy="12" r="5" />
        <path
          d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          fill="none"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useTheme } from '@/composables/useTheme'
const { theme, toggleTheme } = useTheme()
</script>
