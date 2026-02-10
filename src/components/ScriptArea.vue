<template>
  <div class="script_area">
    <div class="script_top">
      <div class="year_title">历年选本</div>
      <div
        :class="'prev_year_btn ' + (scriptIndex <= 0 ? 'valid' : '')"
        @click="getPrevYearScripts"
      ></div>
      <div class="year_text">{{ getYear(scriptIndex) }}</div>
      <div
        :class="'next_year_btn ' + (scriptIndex >= scripts.length - 1 ? 'valid' : '')"
        @click="getNextYearScripts"
      ></div>
    </div>
    <div class="script_swiper" ref="swiperRef">
      <div
        :class="'script_card ' + getCss(index)"
        :style="{
          background: script.bgImage ? `url('${prefix + script.bgImage}')` : '#ffe4e1',
          'background-origin': 'center bottom',
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
  console.log('查看剧本数量', scriptList.length, scriptList)
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
      swiperRef.value?.classList.add('hide')
      setTimeout(() => {
        scriptList.length = 0
        scriptList.push(...scripts[newVal])
        hideIndex.value = -2
        leftIndex.value = -1
        centerIndex.value = 0
        rightIndex.value = 1
        readyIndex.value = 2
        swiperRef.value?.classList.remove('hide')
      }, 500)
    } else {
      scriptList.length = 0
      scriptList.push(...scripts[newVal])
      hideIndex.value = -2
      leftIndex.value = -1
      centerIndex.value = 0
      rightIndex.value = 1
      readyIndex.value = 2
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

<style lang="less" scoped>
.script_area {
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  margin-top: 2vh;
  padding: 1vh;
  background: linear-gradient(135deg, rgba(0, 83, 117, 1), wheat);
  border-radius: 2vh;
  overflow: hidden;

  .script_top {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .year_title {
      flex: 1;
      font-size: 2vh;
      font-weight: bold;
      text-align: left;
    }

    .prev_year_btn {
      width: 3vh;
      height: 2vh;
      background: #fff;
      clip-path: polygon(0 50%, 50% 0, 50% 30%, 100% 30%, 100% 70%, 50% 70%, 50% 100%);
      &.valid {
        opacity: 0;
      }
    }

    .year_text {
      margin: 0 1vh;
      color: #fff;
      font-size: 1.8vh;
      font-style: italic;
    }

    .next_year_btn {
      width: 3vh;
      height: 2vh;
      background: #fff;
      clip-path: polygon(100% 50%, 50% 0, 50% 30%, 0 30%, 0 70%, 50% 70%, 50% 100%);
      &.valid {
        opacity: 0;
      }
    }
  }

  .script_swiper {
    position: relative;
    width: min(90vw, 45vh);
    height: 30vh;
    margin: 2vh 0;
    overflow: hidden;
    opacity: 1;
    transition: opacity 0.5s ease-in-out;

    &.hide {
      opacity: 0;
    }

    .script_card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: min(90vw, 45vh);
      top: 2.5vh;
      width: min(40vw, 20vh);
      height: 25vh;
      background: #ffe4e1;
      border-radius: 1vh;
      overflow: hidden;
      opacity: 0;
      transition:
        transform 0.5s ease-in-out,
        opacity 0.5s ease-in-out;

      &.hide {
        opacity: 0;
        transform: translateX(-460%);
      }
      &.left {
        opacity: 1;
        transform: translateX(-300%);
      }
      &.center {
        opacity: 1;
        transform: translateX(-162.5%) scale(1.2);
      }
      &.right {
        opacity: 1;
        transform: translateX(-25%);
      }
      &.ready {
        opacity: 0;
      }

      .script_container {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          180deg,
          rgba(255, 228, 225, 1) 0,
          rgba(255, 228, 225, 0.8) 60%,
          rgba(255, 228, 225, 0.1) 100%
        );

        .script_name {
          max-width: 90%;
          margin-top: 0.5vh;
          margin-left: 0.5vh;
          font-size: 2.5vh;
          font-weight: 900;
          color: lightgray;
          text-shadow: 0.2vh -0.2vh 0.5vh #000;
        }

        .script_from {
          width: 100%;
          margin-left: 1vh;
          margin-bottom: 0.5vh;
          color: #666;
          font-size: 1.2vh;
          white-space: nowrap;
          overflow: hidden;
        }

        .script_tags {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          margin-left: 1vh;
          overflow: hidden;

          .script_tag {
            flex-shrink: 0;
            margin-right: 0.5vh;
            padding: 0 0.2vh;
            color: brown;
            font-size: 1vh;
            border-radius: 0.5vh;
            border: brown 0.1vh solid;

            &.duration {
              color: rgba(0, 83, 117, 1);
              border: rgba(0, 83, 117, 1) 0.1vh solid;
            }
          }
        }
      }
    }
  }
}
</style>
