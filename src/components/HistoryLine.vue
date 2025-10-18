<template>
  <div class="history_line">
    <div v-for="(event, index) in histories" :key="'event-' + index" class="history_event">
      <div :class="'event_wrap ' + (index % 2 === 0 ? 'left' : 'right')">
        <div class="event_date">{{ event.date }}</div>
        <div class="event_dot"></div>
        <div class="event_name">{{ event.name }}</div>
      </div>
      <div :class="'event_statement ' + (index % 2 === 0 ? 'left' : 'right')">
        {{ event.statement }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import histories from '@/utils/histories'
</script>

<style lang="less" scoped>
.history_line {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: black;
  .history_event {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .event_wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      text-align: center;
      font-size: 2vh;
      font-weight: bold;
      .event_date {
        width: 40%;
      }
      .event_dot {
        width: 2vh;
        height: 2vh;
        margin: 0 1vh;
        background-color: rgba(0, 83, 117, 1);
        border-radius: 50%;
      }
      .event_name {
        width: 40%;
      }

      &.left {
        flex-direction: row;
      }
      &.right {
        flex-direction: row-reverse;
      }
    }
    .event_statement {
      box-sizing: border-box;
      width: 50%;
      padding: 1vh;
      padding-bottom: 5vh;
      text-align: justify;
      font-size: 1.5vh;
      &.left {
        transform: translateX(50%);
        border-left: rgba(0, 83, 117, 1) 0.1vh solid;
      }
      &.right {
        transform: translateX(-50%);
        border-right: rgba(0, 83, 117, 1) 0.1vh solid;
      }
    }
  }
}
</style>
