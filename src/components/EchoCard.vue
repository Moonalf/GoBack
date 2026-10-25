<template>
  <div class="echo_card" @click="showEchoPreview">
    <img :src="prefix + echo.cover" :alt="echo.title" loading="lazy" decoding="async" />
    <div class="echo_title">{{ echo.title }}</div>
    <div class="echo_info">
      <img :src="prefix + echo.avatar" :alt="echo.author" loading="lazy" decoding="async" />
      <div>{{ echo.author }}</div>
      <div class="echo_modified">{{ echo.modified }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const prefix = import.meta.env.BASE_URL
const props = defineProps<{
  echo: any
}>()
const emit = defineEmits(['showEchoPreview'])
const showEchoPreview = () => {
  emit('showEchoPreview')
}
</script>

<style lang="less" scoped>
.echo_card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0.2rem 0;
  border-radius: 0.2rem;
  background-color: rgba(255, 255, 255, 0.3);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:active {
    transform: translateY(-5%);
  }
  img {
    width: 100%;
    object-fit: contain;
  }
  .echo_title {
    width: 100%;
    color: black;
    font-size: 0.24rem;
    font-weight: bold;
    text-indent: 0.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .echo_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    padding-bottom: 0.1rem;
    color: #666;
    font-size: 0.2rem;
    gap: 0.1rem;
    & > div:not(.echo_modified) {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    img {
      width: 0.5rem;
      height: 0.5rem;
      object-fit: cover;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .echo_modified {
      flex-shrink: 0;
      margin-left: auto;
      color: #8a8a8a;
    }
  }
}
</style>
