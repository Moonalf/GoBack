<template>
  <div
    class="banner"
    id="banner"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
    @pointercancel="onPointerCancel"
  >
    <template v-for="(banner, index) in banners" :key="'banner-' + banner">
      <div
        v-if="isVisible(index)"
        :class="'banner_wrap goback_mark ' + getCss(index)"
        :id="'banner_' + index"
      >
        <img :src="prefix + banner" alt="" decoding="async" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const prefix = import.meta.env.BASE_URL
const banners = [
  'banners/banner_f104.webp',
  'banners/banner_sszt.webp',
  'banners/banner_yqwg.webp',
  'banners/banner_bxk.webp',
  'banners/banner_gb2025yx.webp',
  'banners/banner_xiniu.webp',
  'banners/banner_taolesi.webp',
  'banners/banner_xiyou.webp',
  'banners/banner_groupphoto9.webp',
  'banners/banner_window.webp',
  'banners/banner_snake.webp',
  'banners/banner_crane.webp',
  'banners/banner_nieer.webp',
  'banners/banner_mountain.webp',
  'banners/banner_wulong.webp',
  'banners/banner_taohuayuan.webp',
]
import { computed, onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue'
const readyIndex = ref(2)
const rightIndex = ref(1)
const centerIndex = ref(0)
const leftIndex = ref(banners.length - 1)
const fadeIndex = ref(banners.length - 2)
const INTERVAL = 3000
const SWIPE_THRESHOLD = 40
let timer: ReturnType<typeof setInterval> | null = null

// 只渲染当前窗口内的 5 张图，避免一次性加载全部 banner
const visibleIndices = computed(
  () =>
    new Set([
      readyIndex.value,
      rightIndex.value,
      centerIndex.value,
      leftIndex.value,
      fadeIndex.value,
    ]),
)
const isVisible = (index: number) => visibleIndices.value.has(index)

const shift = (step: number) => {
  const count = banners.length
  readyIndex.value = (readyIndex.value + step + count) % count
  rightIndex.value = (rightIndex.value + step + count) % count
  centerIndex.value = (centerIndex.value + step + count) % count
  leftIndex.value = (leftIndex.value + step + count) % count
  fadeIndex.value = (fadeIndex.value + step + count) % count
}

const stopAutoPlay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const startAutoPlay = () => {
  stopAutoPlay()
  // 尊重系统的"减少动态效果"设置
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => shift(1), INTERVAL)
}

let startX = 0
let startY = 0
let pointerId: number | null = null

const onPointerDown = (e: PointerEvent) => {
  if (e.pointerType === 'mouse' && e.button !== 0) return
  pointerId = e.pointerId
  startX = e.clientX
  startY = e.clientY
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  stopAutoPlay()
}

const onPointerUp = (e: PointerEvent) => {
  if (pointerId !== e.pointerId) return
  pointerId = null
  const dx = e.clientX - startX
  const dy = e.clientY - startY
  if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
    shift(dx < 0 ? 1 : -1)
  }
  startAutoPlay()
}

const onPointerCancel = () => {
  pointerId = null
  startAutoPlay()
}

const onVisibilityChange = () => {
  if (document.hidden) {
    stopAutoPlay()
  } else {
    startAutoPlay()
  }
}

onMounted(() => {
  startAutoPlay()
  window.addEventListener('visibilitychange', onVisibilityChange)
})
onUnmounted(() => {
  stopAutoPlay()
  window.removeEventListener('visibilitychange', onVisibilityChange)
})
onActivated(() => {
  startAutoPlay()
})
onDeactivated(() => {
  stopAutoPlay()
})

const getCss = (index: number) => {
  if (index == readyIndex.value) return 'ready'
  if (index == rightIndex.value) return 'right'
  if (index == centerIndex.value) return 'center'
  if (index == leftIndex.value) return 'left'
  if (index == fadeIndex.value) return 'fade'
  return ''
}
</script>
