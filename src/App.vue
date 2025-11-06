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
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import FooterNav from '@/components/FooterNav.vue'
import HeaderBar from '@/components/HeaderBar.vue'
</script>

<style lang="less">
html {
  display: flex;
  flex-direction: column;
  align-items: center;
  body {
    width: min(100vw, 50vh);
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: #000;
    #app {
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: min(100vw, 50vh);
      height: 100vh;
      margin: 0;
      padding: 0;
      background-color: wheat;

      .container {
        width: min(100vw, 50vh);
        height: 100vh;
        margin: 0 auto;
        padding-top: 13vh;
        padding-bottom: 7vh;
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

/* 整个滚动条区域 */
::-webkit-scrollbar {
  width: 0; /* 垂直滚动条宽度 */
  height: 0; /* 水平滚动条高度 */
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background: #f1f1f1; /* 轨道颜色 */
  border-radius: 1px; /* 圆角 */
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background: #888; /* 滑块颜色 */
  border-radius: 1px; /* 圆角 */
  border: 1px solid #f1f1f1; /* 滑块边框(形成内边距效果) */
}

/* 滑块悬停状态 */
::-webkit-scrollbar-thumb:hover {
  background: #555; /* 悬停颜色 */
}

/* 滚动条角落(水平和垂直滚动条交汇处) */
::-webkit-scrollbar-corner {
  background: #f1f1f1;
}
</style>
