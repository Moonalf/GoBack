<template>
  <div class="manager_card">
    <div :class="'background type' + type"></div>
    <img
      :src="prefix + (manager.avatar !== '' ? manager.avatar : 'members/default_member.webp')"
      alt=""
    />
    <div class="name_wrap">
      <div class="manager_name">{{ manager.name }}</div>
    </div>
    <div class="word_wrap" v-if="manager.word">
      <div class="manager_word">{{ manager.word }}</div>
      <div class="carrot_up"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const prefix = import.meta.env.BASE_URL
const props = defineProps<{
  manager: any
  type: number
}>()
</script>

<style lang="less" scoped>
.manager_card {
  position: relative;
  z-index: 1;

  &:hover {
    .word_wrap {
      opacity: 1;
    }
  }

  .background {
    position: absolute;
    width: 106%;
    height: 106%;
    top: -3%;
    left: -3%;
    border-radius: 50%;
    z-index: -1;
    &.type0 {
      background: linear-gradient(135deg, gold 0, pink 70%);
    }
    &.type1 {
      background: linear-gradient(135deg, black 30%, pink 100%);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
  }
  .name_wrap {
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
    border-radius: 50%;
    overflow: hidden;

    .manager_name {
      margin-bottom: 1vh;
      font-size: 1.2vh;
      font-weight: bold;
      color: white;
    }
  }

  .word_wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    bottom: 70%;
    left: -10%;
    width: 120%;
    opacity: 0;

    .manager_word {
      box-sizing: border-box;
      width: 100%;
      color: black;
      background-color: white;
      border-radius: 1vh;
      font-size: 1.2vh;
      padding: 0.5vh;
      text-align: justify;
    }
    .carrot_up {
      width: 2vh;
      height: 1vh;
      margin-top: -1px;
      margin-left: 2vh;
      clip-path: polygon(0 0, 50% 100%, 100% 0);
      background-color: white;
    }
  }
}
</style>
