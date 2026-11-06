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
