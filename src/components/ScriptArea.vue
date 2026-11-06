<template>
  <div class="script_area">
    <div class="script_top">
      <div class="year_title">历年选本</div>
      <div
        :class="'prev_year_btn_wrap ' + (scriptIndex <= 0 ? 'valid' : '')"
        role="button"
        aria-label="上一年"
        @click="getPrevYearScripts"
      >
        <div class="prev_year_btn"></div>
      </div>
      <div class="year_text">{{ getYear(scriptIndex) }}</div>
      <div
        :class="'next_year_btn_wrap ' + (scriptIndex >= scripts.length - 1 ? 'valid' : '')"
        role="button"
        aria-label="下一年"
        @click="getNextYearScripts"
      >
        <div class="next_year_btn"></div>
      </div>
    </div>
    <div class="script_swiper" ref="swiperRef">
      <div
        :class="'script_card ' + getCss(index)"
        :style="{
          background: script.bgImage
            ? `url('${prefix + script.bgImage}') no-repeat`
            : `url('${prefix + 'scripts/default.webp'}') no-repeat`,
          'background-position': 'center bottom',
          'background-size': '100% auto',
        }"
        v-for="(script, index) in scriptList"
        :key="'script-' + index"
        @click="tapScript(index)"
      >
        <div class="script_container">
          <div class="script_name">{{ script.name }}</div>
          <div class="script_from">{{ script.from }}</div>
          <div class="script_tags">
            <div class="script_tag" v-for="(tag, index) in script.tags" :key="'tag-' + index">
              {{ tag }}
            </div>
            <div class="script_tag duration">{{ script.duration }}min</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const prefix = import.meta.env.BASE_URL
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
  () => scriptIndex.value,
  (newVal, oldVal) => {
    if (swiperRef) {
      scriptList.length = 0
      scriptList.push(...scripts[newVal])
      centerIndex.value = Math.min(centerIndex.value, scriptList.length - 1)
      hideIndex.value = centerIndex.value - 2
      leftIndex.value = centerIndex.value - 1
      rightIndex.value = centerIndex.value + 1
      readyIndex.value = centerIndex.value + 2
    }
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
  } else {
    return ''
  }
}
const tapScript = (index: number) => {
  if (index > centerIndex.value) {
    moveRight()
  } else if (index < centerIndex.value) {
    moveLeft()
  }
}
const getNextYearScripts = () => {
  if (scriptIndex.value < scripts.length - 1) {
    scriptIndex.value += 1
  }
}
const getPrevYearScripts = () => {
  if (scriptIndex.value > 0) {
    scriptIndex.value -= 1
  }
}
</script>
