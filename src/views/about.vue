<template>
  <div class="about">
    <!-- <LoadingLayer id="loadingLayer"></LoadingLayer> -->
    <TeacherArea></TeacherArea>
    <div class="title">“爱的回归线”</div>
    <HistoryLine></HistoryLine>
    <div class="title">历年选本</div>
    <ScriptTable></ScriptTable>
    <div class="footer_box"></div>
  </div>
</template>

<script lang="ts" setup>
import HistoryLine from '@/components/HistoryLine.vue'
import ScriptTable from '@/components/ScriptTable.vue'
import TeacherArea from '@/components/TeacherArea.vue'
import LoadingLayer from '@/components/LoadingLayer.vue'
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
