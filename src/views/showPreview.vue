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
    <a
      class="show_video"
      v-for="(video, index) in show?.videos ?? []"
      :key="'video-' + index"
      :href="video.url"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div class="play_icon"><div></div></div>
      <div class="link">{{ video?.caption ?? '' }}</div>
    </a>
    <div class="article_wrap" v-if="show?.articles?.length">
      <div class="sub_title">相关推文</div>
      <a
        class="show_video article"
        v-for="(article, index) in show?.articles ?? []"
        :key="'article-' + index"
        :href="article.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="badge" :class="article.kind === '预告' ? 'pre' : 'post'">
          {{ article.kind ?? '回顾' }}
        </div>
        <div class="link">{{ article.title }}</div>
      </a>
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
</script>
