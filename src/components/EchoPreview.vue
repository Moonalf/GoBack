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
  width: min(100vw, 50vh);
  height: 100vh;
  padding: 2vh;
  padding-bottom: 12vh;
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
    bottom: 6vh;
    left: 0;
    width: 12vh;
    height: 6vh;
    border-radius: 0 3vh 3vh 0;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 99;

    .close_btn {
      color: #fff;
      font-size: 2vh;
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
    margin: 1vh 0;
    font-size: 1.5vh;
    img {
      width: 3vh;
      height: 3vh;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .echo_title {
    width: 100%;
    margin: 1vh 0;
    font-size: 2vh;
    font-weight: bold;
  }
  .echo_content {
    width: 100%;
    font-size: 1.5vh;
    text-align: justify;
  }
  .echo_tag {
    width: 100%;
    font-size: 1.5vh;
    color: rgba(0, 83, 117, 1);
  }
  .echo_modified {
    width: 100%;
    margin: 1vh 0;
    font-size: 1.5vh;
    color: gray;
  }
}
</style>
