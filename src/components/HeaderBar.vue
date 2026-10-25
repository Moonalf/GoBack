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

<style lang="less" scoped>
.header_bar {
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 2rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  z-index: 10;
  img {
    width: 1.5rem;
    height: 1.5rem;
    object-fit: contain;
    border-radius: 50%;
    overflow: hidden;
  }
  .header_text_box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0.3rem;
    color: var(--brand);
    font-weight: 900;
    font-style: italic;
    .header_text_cn {
      font-size: 0.4rem;
    }
    .header_text_en {
      font-size: 0.3rem;
    }
  }
  .theme_toggle {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0.7rem;
    height: 0.7rem;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: var(--surface-glass);
    color: var(--brand);
    cursor: pointer;
    transition:
      transform 0.2s ease,
      background 0.2s ease;
    &:active {
      transform: scale(0.9);
    }
  }
}

/* 桌面宽屏：页头压缩高度，左右内边距与内容区对齐 */
@media (min-width: 1280px) {
  .header_bar {
    width: 100%;
    height: 1.6rem;
    margin: 0 auto;
    padding: 0 0.5rem;
  }
}
</style>
