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
/* 布局样式见 src/styles/layout/portrait.less 与 wide.less */

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
