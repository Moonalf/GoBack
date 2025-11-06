<template>
  <div class="banner" id="banner">
    <div
      class="banner_wrap ready goback_mark"
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
import { onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'
let interval: any = null
let index = 0
onActivated(() => {
  console.log('播放banner')
  const bannerItem = document.getElementById('banner_' + index)
  bannerItem?.classList.remove('ready')
  bannerItem?.classList.add('appear')
  interval = setInterval(() => {
    console.log(index, (index - 1 + banners.length) % banners.length, (index + 1) % banners.length)
    const readyItem = document.getElementById(
      'banner_' + ((index - 1 + banners.length) % banners.length),
    )
    readyItem?.classList.remove('fade')
    readyItem?.classList.add('ready')
    const fadeItem = document.getElementById('banner_' + (index % banners.length))
    fadeItem?.classList.remove('appear')
    fadeItem?.classList.add('fade')
    index = (index + 1) % banners.length
    const appearItem = document.getElementById('banner_' + index)
    appearItem?.classList.remove('ready')
    appearItem?.classList.add('appear')
  }, 3000)
})

onDeactivated(() => {
  console.log('暂停播放banner')
  clearInterval(interval)
})
</script>

<style lang="less" scoped>
.banner {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: min(100vw, 50vh);
  height: calc(min(100vw, 50vh) / 3);
  .banner_wrap {
    position: absolute;
    top: 0;
    width: min(100vw, 50vh);
    height: 100%;
    transition: left 0.5s ease-in-out;
    img {
      height: 100%;
      object-fit: contain;
    }
    &.ready {
      left: calc(1 * min(100vw, 50vh));
      opacity: 0;
    }
    &.appear {
      left: 0;
      opacity: 1;
    }
    &.fade {
      left: calc(-1 * min(100vw, 50vh));
      opacity: 1;
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
