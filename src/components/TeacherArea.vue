<template>
  <div class="teacher_area">
    <div class="teacher_title">指导老师</div>
    <div class="teacher_list">
      <div
        class="teacher_item"
        v-for="(teacher, index) in teachers"
        :key="'teacher-' + index"
        :class="selected === index ? 'selected' : ''"
        @click="selectTeacher(index)"
      >
        <div class="avatar_wrap">
          <img :src="prefix + teacher.avatar" alt="" />
        </div>
        <!-- 宽屏：每个老师展开文字 -->
        <div class="info_wrap desktop_only">
          <div class="teacher_name">{{ teacher.name }}</div>
          <div class="teacher_description">{{ teacher.description }}</div>
        </div>
      </div>
    </div>
    <!-- 竖屏：选中老师的详情 -->
    <div class="teacher_detail mobile_only" v-if="teachers[selected]">
      <div class="teacher_name">{{ teachers[selected].name }}</div>
      <div class="teacher_description">{{ teachers[selected].description }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const prefix = import.meta.env.BASE_URL
import teachers from '@/utils/teachers'
import { ref } from 'vue'
const selected = ref(0)
const selectTeacher = (index: number) => {
  selected.value = index
}
</script>
