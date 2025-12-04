<template>
  <div class="producer_card">
    <img
      :src="prefix + (producer.avatar !== '' ? producer.avatar : 'members/default_member.webp')"
      alt=""
    />
    <div class="name_wrap">
      <div class="producer_character">{{ producer.character }}</div>
      <div class="producer_name">{{ producer.name }}</div>
    </div>
    <div class="word_wrap" v-if="producer.word">
      <div class="carrot_up"></div>
      <div class="producer_word">{{ producer.word }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const prefix = import.meta.env.BASE_URL
const props = defineProps<{
  producer: any
}>()
</script>

<style lang="less" scoped>
.producer_card {
  position: relative;

  &:hover {
    .word_wrap {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    object-fit: contain;
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
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 100%);

    .producer_character {
      font-size: 1.2vh;
      color: wheat;
      border-bottom: wheat 0.1vh solid;
    }

    .producer_name {
      margin-bottom: 0.5vh;
      font-size: 1vh;
      color: wheat;
    }
  }

  .word_wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 70%;
    left: -10%;
    width: 120%;
    opacity: 0;
    z-index: 1;

    .carrot_up {
      width: 2vh;
      height: 1vh;
      margin-left: 2vh;
      clip-path: polygon(0 100%, 50% 0, 100% 100%);
      background-color: white;
    }
    .producer_word {
      box-sizing: border-box;
      width: 100%;
      margin-top: -1px;
      color: black;
      background-color: white;
      border-radius: 1vh;
      font-size: 1.2vh;
      padding: 0.5vh;
      text-align: justify;
    }
  }
}
</style>
