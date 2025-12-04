<template>
  <div class="show_preview" id="showPreview">
    <div class="close_wrap" @click="closeShowPreview">
      <div class="close_btn">← Go back</div>
    </div>
    <div class="intro_bg">
      <img :src="prefix + (show?.introbg ?? '')" alt="" />
      <div class="shadow"></div>
    </div>
    <div class="show_title">{{ show?.title ?? '' }}</div>
    <div class="sub_title">演出介绍</div>
    <div
      class="show_intro"
      v-for="(content, index) in show?.introduction ?? []"
      :key="'intro-' + index"
    >
      {{ content }}
    </div>
    <div
      class="show_video"
      v-for="(video, index) in show?.videos ?? []"
      :key="'video-' + index"
      @click="linkVideo(video.url)"
    >
      <div class="play_icon"><div></div></div>
      <div class="link">{{ video?.caption ?? '' }}</div>
    </div>
    <div class="sub_title">制作团队</div>
    <div class="producer_group" v-for="(group, idx) in producerGroup" :key="'pdgroup-' + idx">
      <ProducerCard
        class="producer_card"
        v-for="(producer, idy) in group"
        :key="'pd-' + idx + '-' + idy"
        :producer="producer"
      ></ProducerCard>
    </div>
    <div class="sub_title">卡司阵容</div>
    <div class="cast_area" v-for="(castGroup, index) in castGroups as any" :key="'casts-' + index">
      <div class="cast_group_name" v-if="show.programs && show.programs.length">
        <div class="name">{{ '《' + show.programs[index] + '》剧组' }}</div>
        <div class="circle_icon"></div>
      </div>
      <div class="cast_group" v-for="(group, idx) in castGroup as any" :key="'cagroup-' + idx">
        <CastCard
          :class="
            'cast_card border_' +
            ((index * castGroups.length + idx * 3 + idy) % 8).toString() +
            ' rotate_' +
            ((index * castGroups.length + idx * 3 + idy) % 8).toString()
          "
          v-for="(cast, idy) in group"
          :key="'pd-' + idx + '-' + idy"
          :cast="cast"
        ></CastCard>
      </div>
    </div>
    <div class="sub_title" v-if="show?.photos && show?.photos.length">现场回顾</div>
    <div class="show_photo" v-for="(photo, index) in show?.photos ?? []" :key="'photo-' + index">
      <img :src="prefix + photo" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
const prefix = import.meta.env.BASE_URL
import ProducerCard from '@/components/ProducerCard.vue'
import CastCard from '@/components/CastCard.vue'
import showus from '@/utils/showus'
import { devideArr } from '@/utils/methods'
import { ref } from 'vue'
const producerGroup = ref<any>([])
const castGroups = ref<any>([])
const show = ref<any>(null)

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const onCreated = () => {
  let _idx = parseInt(String(route.query.idx) ?? '0')
  let _idy = parseInt(String(route.query.idy) ?? '0')
  show.value = showus[_idx].shows[_idy]
  producerGroup.value = devideArr(show.value.producers, 4)
  castGroups.value = show.value.casts.map((group: any, index: number) => {
    return devideArr(group, 3)
  })
}
onCreated()

import { onMounted, onUnmounted } from 'vue'
onMounted(() => {
  //   const showPreview = document.getElementById('showPreview')
  //   if (showPreview) {
  //     showPreview.classList.add('show')
  //   }
})
onUnmounted(() => {})

const closeShowPreview = () => {
  router.go(-1)
}
const linkVideo = (url: string) => {
  window.location.href = url
}
</script>

<style lang="less" scoped>
.show_preview {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  width: min(100vw, 50vh);
  height: 100vh;
  padding: 0 2vh;
  padding-bottom: 10vh;
  background: linear-gradient(180deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.9));
  z-index: 20;
  overflow-y: scroll;
  overflow-x: hidden;
  transition: opacity 5s ease-in-out;
  color: white;
  //   opacity: 0;

  //   &.show {
  //     opacity: 1;
  //   }

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

  .intro_bg {
    box-sizing: border-box;
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    width: 100%;
    height: 20%;
    padding: 1vh;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .shadow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      // background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 1) 100%);
      background: radial-gradient(
        ellipse closest-side at center,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 1)
      );
    }
  }

  .show_title {
    width: 100%;
    margin-top: 15vh;
    font-size: 2.5vh;
    font-weight: bold;
    color: wheat;
    text-align: center;
  }

  .sub_title {
    width: 100%;
    margin-top: 3vh;
    margin-bottom: 1vh;
    background: linear-gradient(90deg, rgba(245, 222, 179, 1) 0, rgba(245, 222, 179, 0) 50%);
    color: black;
    font-size: 2vh;
    border-radius: 1vh;
    text-indent: 1vh;
    font-weight: bold;
  }

  .show_intro {
    width: 100%;
    font-size: 1.5vh;
    text-align: justify;
    text-indent: 3vh;
    color: wheat;
  }

  .show_video {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding-left: 3vh;
    font-size: 1.5vh;
    color: wheat;
    .play_icon {
      width: 2vh;
      height: 2vh;
      border: wheat 0.1vh solid;
      div {
        width: 100%;
        height: 100%;
        clip-path: polygon(20% 10%, 80% 50%, 20% 90%);
        background-color: wheat;
      }
    }
    .link {
      color: wheat;
      text-decoration: underline;
    }
  }

  .producer_group {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-bottom: 1vh;

    .producer_card {
      width: 23%;
      margin: 0 1%;
    }
  }

  .cast_area {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .cast_group_name {
      position: relative;
      width: 100%;
      margin-top: 2vh;
      .name {
        margin-left: 2vh;
        font-size: 1.5vh;
        color: wheat;
        font-weight: bold;
        border-top: wheat 0.2vh solid;
      }
      .circle_icon {
        position: absolute;
        top: -1vh;
        left: 0;
        width: 2vh;
        height: 2vh;
        border-radius: 50%;
        border: wheat 0.2vh solid;
      }
    }

    .cast_group {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 42vh;
      margin-bottom: 1vh;

      .cast_card {
        width: 12vh;
        height: 15vh;
        margin: 0 1vh;
      }
    }
  }

  .show_photo {
    width: 100%;
    margin-bottom: 1vh;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
}

.border {
  &_0 {
    background: linear-gradient(135deg, rgba(0, 83, 117, 1), wheat);
  }
  &_1 {
    background: linear-gradient(135deg, red, yellow);
  }
  &_2 {
    background: linear-gradient(135deg, orange, wheat);
  }
  &_3 {
    background: linear-gradient(135deg, yellow, skyblue);
  }
  &_4 {
    background: linear-gradient(135deg, green, wheat);
  }
  &_5 {
    background: linear-gradient(135deg, blue, wheat);
  }
  &_6 {
    background: linear-gradient(135deg, pink, skyblue);
  }
  &_7 {
    background: linear-gradient(135deg, purple, wheat);
  }
}
.rotate {
  &_0 {
    transform: rotate(-3deg);
  }
  &_1 {
    transform: rotate(2deg);
  }
  &_2 {
    transform: rotate(-1deg);
  }
  &_3 {
    transform: rotate(2deg);
  }
  &_4 {
    transform: rotate(-1deg);
  }
  &_5 {
    transform: rotate(3deg);
  }
  &_6 {
    transform: rotate(-2deg);
  }
  &_7 {
    transform: rotate(1deg);
  }
}
</style>
