<template>
  <div class="banner" id="banner">
    <div
      :class="'banner_wrap goback_mark ' + getCss(index)"
      v-for="(banner, index) in banners"
      :key="'banner-' + banner"
      :id="'banner_' + index"
    >
      <img :src="prefix + banner" alt="" />
    </div>
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
  // "banners/banner_gb2024.webp",
  'banners/banner_window.webp',
  // "banners/banner_gb20232.webp",
  'banners/banner_snake.webp',
  // "banners/banner_gb2023.webp",
  'banners/banner_crane.webp',
  'banners/banner_nieer.webp',
  'banners/banner_mountain.webp',
  'banners/banner_wulong.webp',
  'banners/banner_taohuayuan.webp',
]
import { ref } from 'vue'
const readyIndex = ref(2)
const rightIndex = ref(1)
const centerIndex = ref(0)
const leftIndex = ref(banners.length - 1)
const fadeIndex = ref(banners.length - 2)
let interval: any = null

import { onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'

onActivated(() => {
  if (interval) {
    clearInterval(interval)
  }
  interval = setInterval(() => {
    readyIndex.value = (readyIndex.value + 1) % banners.length
    rightIndex.value = (rightIndex.value + 1) % banners.length
    centerIndex.value = (centerIndex.value + 1) % banners.length
    leftIndex.value = (leftIndex.value + 1) % banners.length
    fadeIndex.value = (fadeIndex.value + 1) % banners.length
  }, 3000)
})

onDeactivated(() => {
  console.log('暂停播放banner')
  clearInterval(interval)
})

const getCss = (index: number) => {
  if (index == readyIndex.value) {
    return 'ready'
  } else if (index == rightIndex.value) {
    return 'right'
  } else if (index == centerIndex.value) {
    return 'center'
  } else if (index == leftIndex.value) {
    return 'left'
  } else if (index == fadeIndex.value) {
    return 'fade'
  } else {
    return ''
  }
}
</script>

<style lang="less" scoped>
.banner {
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 7.5rem;
  height: 2.5rem;
  .banner_wrap {
    position: absolute;
    top: 0;
    left: 7.5rem;
    width: 7.5rem;
    height: 100%;
    opacity: 0;
    transition: transform 0.5s ease-in-out;
    img {
      height: 100%;
      object-fit: contain;
    }
    &.ready {
      opacity: 0;
    }
    &.right {
      opacity: 1;
    }
    &.center {
      transform: translateX(-100%);
      opacity: 1;
    }
    &.left {
      transform: translateX(-200%);
      opacity: 1;
    }
    &.fade {
      transform: translateX(-200%);
      opacity: 0;
    }
  }
}
.goback_mark {
  clip-path: polygon(
    0 0,
    0 100%,
    5% 100%,
    6% 85%,
    9% 85%,
    8.8% 88%,
    6.8% 88%,
    6.2% 97%,
    7.2% 97%,
    7.4% 94%,
    8.4% 94%,
    8% 100%,
    9% 100%,
    9.6% 91%,
    12.6% 91%,
    12% 100%,
    13% 100%,
    14% 85%,
    16% 85%,
    16.8% 88%,
    16.6% 91%,
    15.4% 92.5%,
    16.4% 94%,
    16.2% 97%,
    15% 100%,
    17% 100%,
    17.4% 94%,
    18.6% 91%,
    20.6% 91%,
    20.2% 97%,
    21.2% 97%,
    21.6% 91%,
    24.6% 91%,
    24.4% 94%,
    22.4% 94%,
    22.2% 97%,
    24.2% 97%,
    24% 100%,
    25% 100%,
    26% 85%,
    27% 85%,
    26.6% 91%,
    28.6% 91%,
    28.4% 94%,
    26.4% 94%,
    28% 100%,
    27% 100%,
    26.2% 97%,
    26% 100%,
    19% 100%,
    19.4% 94%,
    18.4% 94%,
    18% 100%,
    14% 100%,
    15.2% 97%,
    15.4% 94%,
    14.5% 92.5%,
    15.6% 91%,
    15.8% 88%,
    14.8% 88%,
    14% 100%,
    11% 100%,
    11.4% 94%,
    10.4% 94%,
    10% 100%,
    100% 100%,
    100% 0
  );
}
</style>
