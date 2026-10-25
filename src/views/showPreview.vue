<template>
  <div class="show_preview" id="showPreview">
    <div class="close_wrap" @click="closeShowPreview">
      <div class="close_btn">← Go back</div>
    </div>
    <div class="intro_bg">
      <img :src="prefix + (show?.introbg ?? '')" :alt="show?.title ?? ''" />
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
      <div class="cast_group_name" v-if="show?.programs && show.programs.length">
        <div class="name">{{ '《' + show.programs?.[index] + '》剧组' }}</div>
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
    <div class="show_photos_wrap" v-if="show?.photos && show?.photos.length">
      <div class="sub_title">现场回顾</div>
      <div class="show_photo" v-for="(photo, index) in show?.photos ?? []" :key="'photo-' + index">
        <img :src="prefix + photo" :alt="show?.title ?? ''" loading="lazy" decoding="async" />
      </div>
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
  const _idx = Number.parseInt(String(route.query.idx ?? '0'), 10)
  const _idy = Number.parseInt(String(route.query.idy ?? '0'), 10)
  const target =
    Number.isInteger(_idx) && Number.isInteger(_idy) ? showus[_idx]?.shows?.[_idy] : undefined
  // 参数非法或越界时回退到演出列表，避免整页白屏
  if (!target) {
    router.replace({ name: 'showus' })
    return
  }
  show.value = target
  // 不按固定数量分组，全部放入一组，由 CSS flex-wrap 控制换行（响应式）
  producerGroup.value = devideArr(show.value.producers ?? [], show.value.producers?.length ?? 0)
  castGroups.value = (show.value.casts ?? []).map((group: any) =>
    devideArr(group, group.length),
  )
}
onCreated()

import { onMounted, onUnmounted } from 'vue'
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeShowPreview()
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

const closeShowPreview = () => {
  if (window.history.state?.back) {
    router.go(-1)
  } else {
    router.replace('/')
  }
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
  width: 7.5rem;
  height: 100vh;
  height: 100dvh;
  padding: 0 0.25rem;
  padding-bottom: 1.6rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.9));
  z-index: 20;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  transition: opacity 5s ease-in-out;
  color: white;

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

  .intro_bg {
    box-sizing: border-box;
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    width: 100%;
    height: 3rem;
    padding: 0 0.2rem;
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
    margin-top: 2rem;
    font-size: 0.5rem;
    font-weight: bold;
    color: wheat;
    text-align: center;
  }

  .sub_title {
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.2rem;
    background: linear-gradient(90deg, rgba(245, 222, 179, 1) 0, rgba(245, 222, 179, 0) 50%);
    color: black;
    font-size: 0.3rem;
    border-radius: 0.15rem;
    text-indent: 0.1rem;
    font-weight: bold;
  }

  .show_intro {
    width: 100%;
    font-size: 0.24rem;
    text-align: justify;
    text-indent: 0.4rem;
    color: wheat;
  }

  .show_video {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding-left: 0.4rem;
    font-size: 0.24rem;
    color: wheat;
    cursor: pointer;
    .play_icon {
      width: 0.3rem;
      height: 0.3rem;
      border: wheat 0.01rem solid;
      div {
        width: 100%;
        height: 100%;
        clip-path: polygon(20% 10%, 80% 50%, 20% 90%);
        background-color: wheat;
      }
    }
    .link {
      color: wheat;
      font-weight: bold;
      text-decoration: underline;
      text-underline-offset: 0.04rem;
    }
  }

  .producer_group {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-bottom: 0.2rem;

    .producer_card {
      width: 1.6rem;
      margin-left: 0.05rem;
      margin-right: 0.1rem;
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
      margin-top: 0.2rem;
      .name {
        margin-left: 0.25rem;
        font-size: 0.24rem;
        color: wheat;
        font-weight: bold;
        border-top: wheat 0.01rem solid;
      }
      .circle_icon {
        position: absolute;
        top: -0.1rem;
        left: 0;
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
        border: wheat 0.05rem solid;
      }
    }

    .cast_group {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      margin-bottom: 0.2rem;

      .cast_card {
        width: 2.1rem;
        height: 2.8rem;
        margin-left: 0.1rem;
        margin-right: 0.1rem;
      }
    }
  }

  .show_photo {
    width: 100%;
    margin-bottom: 0.2rem;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
}

/* 桌面宽屏：弹层铺满加宽后的页面，演员/制作团队卡片居中分布 */
@media (min-width: 1280px) {
  .show_preview {
    width: 20rem;
    padding: 0 0.5rem;
    padding-bottom: 1.6rem;

    .producer_group {
      align-self: stretch;
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;

      .producer_card {
        width: 1.6rem;
        margin: 0.1rem 0.12rem;
      }
    }

    .cast_area {
      align-self: stretch;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: flex-start;
      width: 100%;

      .cast_group_name {
        width: 100%;
      }

      .cast_group {
        width: auto;
        justify-content: center;

        :deep(.cast_card) {
          width: 1.6rem;
          height: auto;
          margin: 0.1rem 0.12rem;
          transform: none !important;

          img {
            width: 100%;
            height: auto;
          }
        }
      }
    }

    /* 现场回顾：一行放多张缩略图，不再整行平铺 */
    .show_photos_wrap {
      align-self: stretch;
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;

      .sub_title {
        width: 100%;
      }

      .show_photo {
        width: auto;
        margin: 0.1rem;

        img {
          width: auto;
          height: auto;
          max-width: 5rem;
          max-height: 5rem;
          object-fit: contain;
          border-radius: 0.1rem;
        }
      }
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

/* 浅色主题：弹层改为明亮阅读底色，文字反色，关闭按钮用品牌色 */
[data-theme='light'] .show_preview {
  background: linear-gradient(180deg, #f7f9fb, #eef2f6);
  color: var(--text-on-surface);

  .close_wrap {
    background-color: var(--brand);
    .close_btn {
      color: var(--text-on-brand);
    }
  }

  .intro_bg .shadow {
    background: radial-gradient(
      ellipse closest-side at center,
      rgba(255, 255, 255, 0),
      #f7f9fb
    );
  }

  .show_title,
  .show_intro {
    color: var(--text-on-surface);
  }

  .sub_title {
    background: linear-gradient(
      90deg,
      rgba(0, 83, 117, 0.18) 0,
      rgba(0, 83, 117, 0) 60%
    );
    color: var(--brand);
  }

  .show_video {
    color: var(--text-on-surface);
    .play_icon {
      border-color: var(--brand);
      div {
        background-color: var(--brand);
      }
    }
    .link {
      color: var(--brand);
      font-weight: bold;
      text-decoration: underline;
      text-underline-offset: 0.04rem;
    }
  }

  .cast_area .cast_group_name .name {
    color: var(--text-on-surface);
    border-top-color: var(--surface-border);
  }
  .cast_area .cast_group_name .circle_icon {
    border-color: var(--brand);
  }
}
</style>
