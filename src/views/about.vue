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
