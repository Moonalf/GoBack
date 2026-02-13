<template>
  <div class="cast_card">
    <img
      :src="prefix + (cast.avatar !== '' ? cast.avatar : 'members/default_member.webp')"
      alt=""
    />
    <div :class="'name_wrap ' + cast.side">
      <div class="cast_info">
        {{ cast.name }}
        <span>饰</span>
        {{ cast.character }}
      </div>
    </div>
    <div class="word_wrap" v-if="cast.word">
      <div class="cast_word">{{ cast.word }}</div>
      <div class="carrot_up"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const prefix = import.meta.env.BASE_URL
const props = defineProps<{
  cast: any
}>()
</script>

<style lang="less" scoped>
.cast_card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  &:hover {
    .word_wrap {
      opacity: 1;
    }
  }

  img {
    width: 1.95rem;
    height: 2.6rem;
    object-fit: cover;
  }
  .name_wrap {
    position: absolute;
    top: 0.2rem;
    background-color: rgba(0, 0, 0, 0.3);
    border-right: wheat 0.02rem solid;

    .cast_info {
      writing-mode: vertical-lr;
      font-size: 0.18rem;
      color: wheat;

      span {
        font-size: 0.16rem;
        margin: 0.1rem;
      }
    }

    &.left {
      left: 0.1rem;
    }

    &.right {
      right: 0.1rem;
    }
  }

  .word_wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    bottom: 90%;
    left: -5%;
    width: 110%;
    opacity: 0;
    z-index: 1;

    .cast_word {
      box-sizing: border-box;
      width: 100%;
      color: black;
      background-color: white;
      border-radius: 0.1rem;
      font-size: 0.16rem;
      padding: 0.1rem;
      text-align: justify;
    }
    .carrot_up {
      width: 0.2rem;
      height: 0.1rem;
      margin-top: -1px;
      margin-left: 0.2rem;
      clip-path: polygon(0 0, 50% 100%, 100% 0);
      background-color: white;
    }
  }
}
</style>
