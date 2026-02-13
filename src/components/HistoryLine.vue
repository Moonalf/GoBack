<template>
  <div class="history_line">
    <div v-for="(event, index) in histories" :key="'event-' + index" class="history_event">
      <div class="event_wrap">
        <div class="event_date">{{ event.date }}</div>
        <div class="event_dot"></div>
        <div class="event_name">{{ event.name }}</div>
      </div>
      <div class="content_wrap">
        <div class="event_image">
          <img :src="prefix + event.image" alt="" />
        </div>
        <div class="event_statement">
          {{ event.statement }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import histories from '@/utils/histories'
const prefix = import.meta.env.BASE_URL
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
    margin-top: 0.1rem;

    .event_wrap {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      text-align: center;
      font-size: 0.26rem;
      font-weight: bold;
      .event_date {
        width: 3.6rem;
      }
      .event_dot {
        width: 0.2rem;
        height: 0.2rem;
        margin: 0 0.05rem;
        background-color: rgba(0, 83, 117, 1);
        border-radius: 50%;
      }
      .event_name {
        width: 3.6rem;
      }
    }

    .content_wrap {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      text-align: center;

      .event_image {
        box-sizing: border-box;
        width: 50%;
        padding: 0.2rem;
        img {
          width: 100%;
          object-fit: contain;
          border-radius: 0.2rem;
        }
      }

      .event_statement {
        box-sizing: border-box;
        width: 50%;
        min-height: 2rem;
        padding: 0.2rem;
        text-align: justify;
        font-size: 0.22rem;
        border-left: rgba(0, 83, 117, 1) 0.01rem solid;
      }
    }
  }
}
</style>
