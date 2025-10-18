<template>
  <div class="teacher_area">
    <div class="teacher_title">指导老师</div>
    <div class="avatar_area">
      <div
        :class="'avatar_wrap ' + (selected === index ? 'selected' : '')"
        v-for="(teacher, index) in teachers"
        :key="'teacher-' + index"
        @click="selectTeacher(index)"
      >
        <img :src="prefix + teacher.avatar" alt="" />
      </div>
    </div>
    <div class="info_area">
      <div
        class="info_wrap"
        v-for="(teacher, index) in teachers"
        :key="'info-' + index"
        :id="'Info' + index"
      >
        <div class="teacher_name">{{ teacher.name }}</div>
        <div class="teacher_description">{{ teacher.description }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const prefix = import.meta.env.BASE_URL
import teachers from '@/utils/teachers'
import { onMounted, ref } from 'vue'
const selected = ref(0)
const selectTeacher = (index: number) => {
  if (index === selected.value) {
    return
  }
  teachers.forEach((teacher, idx) => {
    const Info = document.getElementById('Info' + idx)
    if (idx === selected.value) {
      Info?.classList.add('fade')
    } else {
      Info?.classList.remove('fade')
    }
    if (idx === index) {
      Info?.classList.add('show')
    } else {
      Info?.classList.remove('show')
    }
  })
  selected.value = index
}
onMounted(() => {
  const Info = document.getElementById('Info0')
  Info?.classList.add('show')
})
</script>
<style lang="less" scoped>
.teacher_area {
  box-sizing: border-box;
  width: 95%;
  padding: 1vh;
  background: linear-gradient(135deg, rgba(0, 83, 117, 1), wheat);
  border-radius: 2vh;

  .teacher_title {
    font-size: 2vh;
    font-weight: bold;
  }

  .avatar_area {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    height: 13vh;
    overflow-x: scroll;
    overflow-y: hidden;
    .avatar_wrap {
      flex-shrink: 0;
      width: 7.5vh;
      height: 10vh;
      margin-right: 1vh;
      border-radius: 1vh;
      border: gray 0.1vh solid;
      overflow: hidden;
      transition: all 0.2s ease-in-out;

      &.selected {
        transform: scale(1.2) translateY(-1vh) translateX(1vh);
        margin-right: 3vh;
        border: rgba(0, 83, 117, 1) 0.3vh solid;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .info_area {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 18vh;
    margin: 1vh 0;

    .info_wrap {
      position: absolute;
      top: 0;
      left: 0;

      padding: 1vh;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 1vh;
      color: black;
      opacity: 0;
      transform: translateX(3vh);
      transition: all 0.5s ease-in-out;
      .teacher_name {
        font-size: 2vh;
        font-weight: bold;
      }
      .teacher_description {
        height: 14vh;
        font-size: 1.5vh;
        line-height: 2vh;
        text-align: justify;
      }
      &.show {
        opacity: 1;
        transform: translateX(0);
      }
      &.fade {
        opacity: 0;
        transform: translateX(-3vh);
      }
    }
  }
}
</style>
