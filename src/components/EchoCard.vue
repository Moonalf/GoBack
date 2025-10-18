<template>
  <div class="echo_card" @click="showEchoPreview">
    <img :src="prefix + echo.cover" alt="" />
    <div class="echo_title">{{ echo.title }}</div>
    <div class="echo_info">
      <img :src="prefix + echo.avatar" alt="" />
      <div>{{ echo.author }}</div>
      <div class="echo_modified">{{ echo.modified }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const prefix = import.meta.env.BASE_URL
const props = defineProps<{
  echo: any
}>()
import { defineEmits } from 'vue'
const emit = defineEmits(['showEchoPreview'])
const showEchoPreview = () => {
  emit('showEchoPreview')
}
</script>

<style lang="less" scoped>
.echo_card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: auto;
  border-radius: 1vh;
  background-color: rgba(255, 255, 255, 0.3);
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  &:active {
    transform: translateY(-5%);
  }
  img {
    width: 100%;
    object-fit: contain;
  }
  .echo_title {
    width: 100%;
    color: black;
    font-size: 1.5vh;
    font-weight: bold;
    text-indent: 1vh;
  }
  .echo_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    width: 100%;
    padding-left: 1vh;
    padding-bottom: 0.5vh;
    color: gray;
    font-size: 1.2vh;
    img {
      width: 3vh;
      height: 3vh;
      object-fit: cover;
      border-radius: 50%;
    }
    .echo_modified {
      position: absolute;
      right: 1vh;
    }
  }
}
</style>
