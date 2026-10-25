<template>
  <div class="about">
    <TeacherArea></TeacherArea>
    <ScriptArea></ScriptArea>
  </div>
</template>

<script lang="ts" setup>
import TeacherArea from '@/components/TeacherArea.vue'
import ScriptArea from '@/components/ScriptArea.vue'
defineOptions({
  name: 'about',
})
import { onMounted } from 'vue'
onMounted(() => {})
</script>

<style lang="less" scoped>
.about {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 桌面宽屏：两个板块限宽居中，内部卡片保持原始尺寸 */
@media (min-width: 1280px) {
  .about {
    padding-top: 0.2rem;
    > * {
      width: 95%;
      max-width: 16rem;
    }
  }
}
</style>
