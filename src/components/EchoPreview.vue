<template>
  <div class="echo_preview">
    <div class="close_wrap" @click="closeEchoPreview">
      <div class="close_btn">← Go back</div>
    </div>
    <div class="echo_info">
      <img :src="prefix + (echo?.avatar ?? '')" alt="" />
      <div>{{ echo?.author ?? '' }}</div>
    </div>
    <img :src="prefix + (echo?.cover ?? '')" alt="" />
    <div class="echo_title">{{ echo?.title ?? '' }}</div>
    <div class="echo_content" v-for="content in echo?.contents ?? []">{{ content ?? '' }}</div>
    <div class="echo_tag">{{ '#' + (echo?.tags ?? []).join(' #') }}</div>
    <div class="echo_modified">{{ '编辑于' + (echo?.modified ?? '') }}</div>
  </div>
</template>

<script lang="ts" setup>
const prefix = import.meta.env.BASE_URL
const props = defineProps<{
  echo: any
}>()

const emit = defineEmits(['closeEchoPreview'])
const closeEchoPreview = () => {
  emit('closeEchoPreview')
}
</script>

<style lang="less" scoped>
.echo_preview {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: fixed;
  top: 0;
  width: 7.5rem;
  height: 100vh;
  padding: 0.25rem;
  padding-bottom: 1.6rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.9));
  opacity: 0;
  z-index: -1;
  overflow-y: scroll;
  overflow-x: hidden;
  transition: all 0.2s ease-in-out;
  color: white;

  &.show {
    opacity: 1;
    z-index: 20;
  }

  .close_wrap {
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0.8rem;
    left: 0;
    width: 1.8rem;
    height: 0.8rem;
    border-radius: 0 0.4rem 0.4rem 0;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 99;

    .close_btn {
      color: #fff;
      font-size: 0.3rem;
      font-weight: bold;
    }
  }

  img {
    width: 100%;
    object-fit: contain;
  }

  .echo_info {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin: 0.2rem 0;
    font-size: 0.24rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .echo_title {
    width: 100%;
    margin: 0.2rem 0;
    font-size: 0.3rem;
    font-weight: bold;
  }
  .echo_content {
    width: 100%;
    font-size: 0.24rem;
    text-align: justify;
    text-indent: 0.4rem;
  }
  .echo_tag {
    width: 100%;
    font-size: 0.2rem;
    font-weight: bold;
    color: rgba(0, 83, 117, 1);
  }
  .echo_modified {
    width: 100%;
    margin: 0.2rem 0;
    font-size: 0.2rem;
    color: gray;
  }
}
</style>
