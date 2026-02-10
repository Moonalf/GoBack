<template>
  <div class="about">
    <TeacherArea></TeacherArea>
    <ScriptArea></ScriptArea>
    <div class="footer_box"></div>
  </div>
</template>

<script lang="ts" setup>
import TeacherArea from '@/components/TeacherArea.vue'
import ScriptArea from '@/components/ScriptArea.vue'
defineOptions({
  name: 'about',
})
import { onMounted } from 'vue'
onMounted(() => {
  setTimeout(() => {
    const loadingLayer = document.getElementById('loadingLayer')
    loadingLayer?.classList.add('fade')
  }, 2000)
})
</script>

<style lang="less" scoped>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 87vh;
  overflow-y: scroll;
  overflow-x: hidden;
  .title {
    margin: 2vh 0;
    font-size: 2vh;
    color: rgba(0, 83, 117, 1);
    font-weight: bold;
    font-style: italic;
  }
  .footer_box {
    flex-shrink: 0;
    height: 10vh;
  }
}
</style>
