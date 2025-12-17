<template>
  <div class="show_card" @click="showShowPreview">
    <img :src="prefix + show.cover" alt="" />
    <div class="title_wrap">
      <div class="show_title">{{ show.title + (show.subtitle ? '——' + show.subtitle : '') }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const prefix = import.meta.env.BASE_URL
const props = defineProps<{
  show: any
}>()

const emit = defineEmits(['showShowPreview'])
const showShowPreview = () => {
  emit('showShowPreview')
}
</script>

<style lang="less" scoped>
.show_card {
  flex-shrink: 0;
  position: relative;
  margin: 0 1vh;
  border-radius: 1vh;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  &:active {
    transform: translateY(-2vh);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .title_wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 1) 100%
    );

    .show_title {
      margin-bottom: 1vh;
      font-size: 1.5vh;
      font-weight: bold;
      color: white;
    }
  }
}
</style>
