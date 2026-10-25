<template>
  <div class="header_bar">
    <img src="/common/goback_logo.webp" alt="告白话剧社" />
    <div class="header_text_box">
      <div class="header_text_cn">告白话剧社</div>
      <div class="header_text_en">GoBack Drama Theater</div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.header_bar {
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
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

/* 桌面宽屏：页头压缩高度，左右内边距与内容区对齐 */
@media (min-width: 1280px) {
  .header_bar {
    width: 100%;
    height: 1.6rem;
    margin: 0 auto;
    padding: 0 0.5rem;
  }
}
</style>
