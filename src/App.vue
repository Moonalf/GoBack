<template>
  <div class="container">
    <HeaderBar></HeaderBar>
    <!-- <RouterView /> -->
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="['home', 'about', 'showus', 'echo']">
        <component :is="Component" :key="route.name" />
      </keep-alive>
    </router-view>
    <FooterNav></FooterNav>
  </div>
  <div ref="thumb" class="scroll_thumb"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import FooterNav from '@/components/FooterNav.vue'
import HeaderBar from '@/components/HeaderBar.vue'

// 原生滚动条不占宽度，用悬浮滑块提示滚动位置
const HIDE_DELAY = 700
const thumb = ref<HTMLElement | null>(null)
let scroller: HTMLElement | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

const hideThumb = () => {
  thumb.value?.classList.remove('show')
}

const updateThumb = () => {
  const el = thumb.value
  if (!el || !scroller) return
  const { scrollTop, scrollHeight, clientHeight } = scroller
  if (scrollHeight <= clientHeight) {
    hideThumb()
    return
  }
  const rect = scroller.getBoundingClientRect()
  const thumbHeight = Math.max(40, (clientHeight * clientHeight) / scrollHeight)
  const progress = scrollTop / (scrollHeight - clientHeight)
  el.style.height = `${thumbHeight}px`
  el.style.top = `${rect.top + progress * (clientHeight - thumbHeight)}px`
  el.style.right = `${window.innerWidth - rect.right + 2}px`
  el.classList.add('show')
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(hideThumb, HIDE_DELAY)
}

const onScroll = (e: Event) => {
  const target = e.target
  if (!(target instanceof HTMLElement) || target.scrollHeight <= target.clientHeight) return
  scroller = target
  updateThumb()
}

const onResize = () => updateThumb()

onMounted(() => {
  // 各页面在自己内部滚动，用捕获阶段统一监听
  window.addEventListener('scroll', onScroll, true)
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll, true)
  window.removeEventListener('resize', onResize)
  if (hideTimer) clearTimeout(hideTimer)
})
</script>

<style lang="less">
html {
  display: flex;
  flex-direction: column;
  align-items: center;
  body {
    width: 7.5rem;
    height: 100vh;
    height: 100dvh;
    margin: 0;
    padding: 0;
    background-color: #000;
    #app {
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 7.5rem;
      height: 100vh;
      height: 100dvh;
      margin: 0;
      padding: 0;
      background-color: wheat;

      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 7.5rem;
        height: 100vh;
        height: 100dvh;
        margin: 0 auto;
        background: linear-gradient(
          135deg,
          rgba(0, 83, 117, 0) 0%,
          rgba(0, 83, 117, 0.2) 20%,
          rgba(0, 83, 117, 0.4) 40%,
          rgba(0, 83, 117, 0.6) 60%,
          rgba(0, 83, 117, 0.8) 80%,
          rgba(0, 83, 117, 1) 100%
        );
      }
    }
  }
}

/* 桌面宽屏：渐变底色铺满整个视口，内容区加宽到 20rem（约 1200px）居中 */
@media (min-width: 1280px) {
  html body {
    width: 100%;
    background-color: wheat;
    background-image: linear-gradient(
      135deg,
      rgba(0, 83, 117, 0) 0%,
      rgba(0, 83, 117, 0.2) 20%,
      rgba(0, 83, 117, 0.4) 40%,
      rgba(0, 83, 117, 0.6) 60%,
      rgba(0, 83, 117, 0.8) 80%,
      rgba(0, 83, 117, 1) 100%
    );
  }
  html body #app {
    width: 20rem;
    margin: 0 auto;
    background-color: transparent;
  }
  html body #app .container {
    width: 20rem;
    background: transparent;
  }
}

/* 原生滚动条完全隐藏，不占宽度 */
* {
  scrollbar-width: none;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/* 悬浮滚动条：滚动时出现，停止后淡出 */
.scroll_thumb {
  position: fixed;
  z-index: 100;
  width: 4px;
  border-radius: 2px;
  background: rgba(0, 83, 117, 0.45);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;

  &.show {
    opacity: 1;
  }
}
</style>
