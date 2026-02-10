<template>
  <div class="script_area">
    <div class="script_top">
      <div>{{ getYear(scriptIndex) }}</div>
    </div>
    <div class="script_swiper" ref="swiperRef">
      <div
        :class="'script_card ' + getCss(index)"
        v-for="(script, index) in scriptList"
        :key="'script-' + index"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import scripts from '@/utils/scripts'
import { getYear } from '@/utils/methods'

const scriptIndex = ref(scripts.length - 1)
const scriptList = reactive<Array<any>>([])
const readyIndex = ref(0)
const rightIndex = ref(0)
const centerIndex = ref(0)
const leftIndex = ref(0)
const hideIndex = ref(0)

const swiperRef = ref<HTMLElement | null>(null)
const startX = ref(0)
const startY = ref(0)
const isManualSwiping = ref(false)
const SWIPE_THRESHOLD = 50 // 像素阈值

import { onMounted, onUnmounted } from 'vue'
onMounted(() => {
  if (swiperRef.value) {
    swiperRef.value.addEventListener('touchstart', onTouchStart, { passive: false })
    swiperRef.value.addEventListener('touchmove', onTouchMove, { passive: false })
    swiperRef.value.addEventListener('touchend', onTouchEnd, { passive: false })
  }
})
onUnmounted(() => {
  if (swiperRef.value) {
    swiperRef.value.removeEventListener('touchstart', onTouchStart)
    swiperRef.value.removeEventListener('touchmove', onTouchMove)
    swiperRef.value.removeEventListener('touchend', onTouchEnd)
  }
})
import { watch } from 'vue'
watch(
  () => scriptIndex,
  (newVal, oldVal) => {
    scriptList.length = 0
    scriptList.push(...scripts[newVal.value])
    hideIndex.value = -2
    leftIndex.value = -1
    centerIndex.value = 0
    rightIndex.value = 1
    hideIndex.value = 2
  },
  { immediate: true },
)

const onTouchStart = (e: TouchEvent) => {
  if (!e.touches || !e.touches.length || isManualSwiping.value) return
  const t = e.touches[0]
  startX.value = t.clientX
  startY.value = t.clientY
}
const onTouchMove = (e: TouchEvent) => {
  if (!e.touches || !e.touches.length || isManualSwiping.value) return
  const t = e.touches[0]
  const dx = t.clientX - startX.value
  const dy = t.clientY - startY.value
  if (Math.abs(dx) > Math.abs(dy)) {
    e.preventDefault()
  }
}
const onTouchEnd = (e: TouchEvent) => {
  if (!e.changedTouches || !e.changedTouches.length || isManualSwiping.value) return
  isManualSwiping.value = true
  setTimeout(() => {
    isManualSwiping.value = false
  }, 400)
  const t = e.changedTouches[0]
  const dx = t.clientX - startX.value
  const dy = t.clientY - startY.value
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
    if (dx < 0) {
      moveRight()
    } else {
      moveLeft()
    }
  }
}
const moveRight = () => {
  if (scriptList.length == 1 || centerIndex.value >= scriptList.length - 1) {
    return
  } else {
    readyIndex.value = readyIndex.value + 1
    rightIndex.value = rightIndex.value + 1
    centerIndex.value = centerIndex.value + 1
    leftIndex.value = leftIndex.value + 1
    hideIndex.value = hideIndex.value + 1
  }
}
const moveLeft = () => {
  if (scriptList.length == 1 || centerIndex.value <= 0) {
    return
  } else {
    readyIndex.value = readyIndex.value - 1
    rightIndex.value = rightIndex.value - 1
    centerIndex.value = centerIndex.value - 1
    leftIndex.value = leftIndex.value - 1
    hideIndex.value = hideIndex.value - 1
  }
}
const getCss = (index: number) => {
  if (index == hideIndex.value) {
    return 'hide'
  } else if (index == leftIndex.value) {
    return 'left'
  } else if (index == centerIndex.value) {
    return 'center'
  } else if (index == rightIndex.value) {
    return 'right'
  } else if (index == readyIndex.value) {
    return 'ready'
  }
}
</script>

<style lang="less" scoped>
.script_area {
  box-sizing: border-box;
  width: 95%;
  padding: 1vh;
  background: linear-gradient(135deg, rgba(0, 83, 117, 1), wheat);
  border-radius: 2vh;

  .script_title {
    font-size: 2vh;
    font-weight: bold;
  }

  .script_swiper {
    position: relative;
    overflow: hidden;
    .script_card {
      position: absolute;
      right: 100%;
      top: 0;
    }
  }
}
</style>
