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
        <!-- 桌面端：每个老师展开文字 -->
        <div class="info_wrap desktop_only">
          <div class="teacher_name">{{ teacher.name }}</div>
          <div class="teacher_description">{{ teacher.description }}</div>
        </div>
      </div>
    </div>
    <!-- 移动端：选中老师的详情 -->
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

<style lang="less" scoped>
.teacher_area {
  box-sizing: border-box;
  width: 95%;
  padding: 0.2rem;
  background: linear-gradient(135deg, rgba(0, 83, 117, 1), wheat);
  border-radius: 0.2rem;

  .teacher_title {
    font-size: 0.3rem;
    font-weight: bold;
    margin-bottom: 0.15rem;
  }

  .teacher_list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 0.2rem;
  }

  .teacher_item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    transition: all 0.2s ease-in-out;

    .avatar_wrap {
      flex-shrink: 0;
      width: 1.2rem;
      height: 1.6rem;
      border-radius: 0.15rem;
      border: gray 0.03rem solid;
      overflow: hidden;
      transition: all 0.2s ease-in-out;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &.selected .avatar_wrap {
      border: rgba(0, 83, 117, 1) 0.05rem solid;
      transform: scale(1.05);
    }
  }

  /* 移动端：每个老师只显示头像，详情统一放底部 */
  .desktop_only {
    display: none;
  }

  .teacher_detail {
    min-height: 2.8rem;
    margin-top: 0.2rem;
    padding-top: 0.15rem;
    border-top: rgba(0, 0, 0, 0.15) 0.01rem solid;

    .teacher_name {
      font-size: 0.28rem;
      font-weight: bold;
      margin-bottom: 0.05rem;
    }

    .teacher_description {
      font-size: 0.22rem;
      line-height: 0.3rem;
      text-align: justify;
    }
  }
}

/* 桌面宽屏：所有老师纵向展开，头像+文字一行一个 */
@media (min-width: 1280px) {
  .teacher_area {
    max-width: 18rem;

    .mobile_only {
      display: none;
    }

    .teacher_list {
      flex-direction: column;
      align-items: stretch;
      gap: 0;
    }

    .teacher_item {
      gap: 0.4rem;
      padding: 0.15rem 0;
      border-bottom: rgba(0, 0, 0, 0.1) 0.01rem solid;

      &:last-child {
        border-bottom: none;
      }

      .avatar_wrap {
        width: 1.5rem;
        height: 2rem;
      }

      .desktop_only {
        display: block;
        flex: 1;
        min-width: 0;
      }

      .info_wrap {
        .teacher_name {
          font-size: 0.3rem;
          font-weight: bold;
          margin-bottom: 0.05rem;
        }

        .teacher_description {
          font-size: 0.22rem;
          line-height: 0.32rem;
          text-align: justify;
        }
      }
    }
  }
}
</style>
