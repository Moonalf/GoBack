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
</style>
