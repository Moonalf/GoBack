<template>
  <div class="showus" ref="showusBox">
    <!-- <LoadingLayer id="loadingLayer"></LoadingLayer> -->
    <div
      :class="'showus_block_wrap ' + (idx % 2 == 0 ? 'left' : 'right')"
      v-for="(showusPerYear, idx) in showusData"
      :key="'showus-' + idx"
      :id="'Showus' + idx"
    >
      <div class="showus_block">
        <div class="year_wrap">
          <div class="year">
            {{ getYear(showusData.length - idx - 1) + '(' + getIdx(showusData.length - idx) + ')' }}
          </div>
        </div>
        <ManagerArea :managers="showusPerYear.managers"></ManagerArea>
        <div class="show_card_list film" v-if="showusPerYear.shows.length">
          <ShowCard
            class="show_card"
            v-for="(show, idy) in showusPerYear.shows"
            :key="'show-' + idy"
            :show="show"
            @show-show-preview="openShowPreview(idx, idy)"
          ></ShowCard>
        </div>
        <div class="show_card_list film empty" v-else>
          <div>敬请期待</div>
          <div>In a moment we go back.</div>
        </div>
      </div>
      <div class="ring_front_wrap">
        <div class="ring_front"></div>
      </div>
      <div class="ring_back_wrap">
        <div class="ring_back"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import showus from '@/utils/showus'
import { getYear, getIdx } from '@/utils/methods'
import ManagerArea from '@/components/ManagerArea.vue'
import ShowCard from '@/components/ShowCard.vue'

defineOptions({
  name: 'showus',
})

import { ref, nextTick, onUnmounted } from 'vue'
const showusBox = ref<HTMLElement | any>(null)
const scrollTop = ref(0)
const showusData = showus

import { useRouter } from 'vue-router'
const router = useRouter()
let interval: any = null
declare const window: any

/************************************************** lifecircles **************************************************/
const onCreated = () => {}
onCreated()
import { onMounted } from 'vue'

onMounted(() => {})

import { onActivated, onDeactivated } from 'vue'
onActivated(() => {
  showusBox.value.scrollTop = scrollTop.value
  showusBox.value.addEventListener('scroll', handleScroll)
})
onDeactivated(() => {
  showusBox.value.removeEventListener('scroll', handleScroll)
})
onUnmounted(() => {})

/************************************************** methods **************************************************/

const openShowPreview = (idx: number, idy: number) => {
  router.push({
    name: 'showPreview',
    query: {
      idx,
      idy,
    },
  })
}

const handleScroll = () => {
  scrollTop.value = showusBox.value.scrollTop
}
</script>
