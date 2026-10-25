<template>
  <div class="history_line">
    <div v-for="(event, index) in histories" :key="'event-' + index" class="history_event">
      <div class="event_image">
        <img :src="prefix + event.image" :alt="event.name" loading="lazy" decoding="async" />
      </div>
      <div class="event_dot"></div>
      <div class="event_content">
        <div class="event_header">
          <span class="event_date">{{ event.date }}</span>
          <span class="event_name">{{ event.name }}</span>
        </div>
        <div class="event_statement">{{ event.statement }}</div>
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
  color: var(--text-on-surface);

  .history_event {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 0.1rem;
    gap: 0.2rem;

    .event_image {
      box-sizing: border-box;
      width: 3rem;
      flex-shrink: 0;
      padding: 0.1rem;
      img {
        width: 100%;
        object-fit: contain;
        border-radius: 0.2rem;
      }
    }

    .event_dot {
      width: 0.2rem;
      height: 0.2rem;
      margin: 0;
      background-color: var(--brand);
      border-radius: 50%;
      flex-shrink: 0;
    }

    .event_content {
      flex: 1;
      min-width: 0;

      .event_header {
        font-size: 0.26rem;
        font-weight: bold;
        margin-bottom: 0.1rem;
        .event_date {
          margin-right: 0.1rem;
        }
      }

      .event_statement {
        text-align: justify;
        font-size: 0.22rem;
        line-height: 0.3rem;
      }
    }
  }
}

/* 桌面宽屏：放大图片，圆点在图文分界线上天然对齐 */
@media (min-width: 1280px) {
  .history_line {
    max-width: 18rem;
    margin: 0 auto;
    padding: 0 0.5rem;

    .history_event {
      .event_image {
        width: 4.5rem;
        padding: 0.2rem;
      }
    }
  }
}
</style>
