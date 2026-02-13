<template>
  <div class="header_bar">
    <img src="/common/goback_logo.webp" alt="" />
    <div class="header_text_box">
      <div class="header_text_cn">告白话剧社</div>
      <div class="header_text_en">GoBack Drama Theater</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const scrollListener = (e: any) => {
  console.log('scroll', window.pageYOffset)
}
import { onMounted } from 'vue'
onMounted(() => {
  window.addEventListener('scroll', scrollListener)
})
</script>

<style lang="less" scoped>
.header_bar {
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 7.5rem;
  height: 2rem;
  padding-left: 0.3rem;
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
    color: rgba(0, 83, 117, 1);
    font-weight: 900;
    font-style: italic;
    .header_text_cn {
      font-size: 0.4rem;
    }
    .header_text_en {
      font-size: 0.3rem;
    }
  }
}
</style>
