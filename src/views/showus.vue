<template>
  <div class="showus">
    <!-- <LoadingLayer id="loadingLayer"></LoadingLayer> -->
    <div
      class="showus_block"
      v-for="(showusPerYear, idx) in showus"
      :key="'showus-' + idx"
      :id="'Showus' + idx"
    >
      <div class="year_wrap">
        <div class="year">
          {{ getYear(showus.length - idx - 1) + '(' + getIdx(showus.length - idx) + ')' }}
        </div>
      </div>
      <ManagerArea :managers="showusPerYear.managers"></ManagerArea>
      <div class="show_card_list film" v-if="showusPerYear.shows.length">
        <ShowCard
          class="show_card"
          v-for="(show, idy) in showusPerYear.shows"
          :key="'show-' + idy"
          :show="show"
          @show-show-preview="showShowPreview(idx, idy)"
        ></ShowCard>
      </div>
      <div class="show_card_list film empty" v-else>
        <div>敬请期待</div>
        <div>In a moment we go back.</div>
      </div>
    </div>
    <ShowPreview
      id="ShowPreview"
      :show="showPreview"
      @close-show-preview="closeShowPreview"
    ></ShowPreview>
    <div class="footer_box"></div>
  </div>
</template>

<script lang="ts" setup>
import showus from '@/utils/showus'
import { getYear, getIdx } from '@/utils/methods'
import ManagerArea from '@/components/ManagerArea.vue'
import ShowCard from '@/components/ShowCard.vue'
import ShowPreview from '@/components/ShowPreview.vue'
import { ref } from 'vue'
const showPreview = ref(showus[0].shows[0])
const showShowPreview = (idx: number, idy: number) => {
  showPreview.value = showus[idx].shows[idy]
  setTimeout(() => {
    const ShowPreview = document.getElementById('ShowPreview')
    ShowPreview?.classList.add('show')
  }, 500)
}
const closeShowPreview = () => {
  const ShowPreview = document.getElementById('ShowPreview')
  ShowPreview?.classList.remove('show')
}
import { onActivated } from 'vue'
let interval: any = null
// 由于使用了，页面切回来时只有onActivated有效。
onActivated(() => {
  for (let i = 0; i < showus.length; i++) {
    const el = document.getElementById('Showus' + i)
    el?.classList.remove('show')
  }
  if (interval) clearInterval(interval)
  let count = 0
  interval = setInterval(() => {
    if (count < showus.length) {
      const el = document.getElementById('Showus' + count)
      el?.classList.add('show')
      count += 1
    } else {
      clearInterval(interval)
    }
  }, 500)
})
import LoadingLayer from '@/components/LoadingLayer.vue'
import { onMounted } from 'vue'
onMounted(() => {
  setTimeout(() => {
    const loadingLayer = document.getElementById('loadingLayer')
    loadingLayer?.classList.add('fade')
  }, 2000)
})
</script>

<style lang="less" scoped>
.showus {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 87vh;
  overflow-y: scroll;
  overflow-x: hidden;

  .showus_block {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 2vh;
    opacity: 0;
    transform: translateY(5vh);
    transition: all 0.5s ease-in-out;

    &.show {
      opacity: 1;
      transform: translateY(0);
    }

    .year_wrap {
      position: relative;
      width: 90%;
      margin: 3vh 0;
      border-top: white 0.2vh solid;
      .year {
        position: absolute;
        top: -1.25vh;
        left: 50%;
        padding: 0 1vh;
        background-color: white;
        font-size: 2vh;
        line-height: 2.5vh;
        color: rgba(0, 83, 117, 1);
        border-radius: 1vh;
        text-align: center;
        font-style: italic;
        font-weight: 600;
        transform: translateX(-50%);
      }
    }

    .show_card_list {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      width: 95%;
      height: 24vh;
      margin-top: 1vh;
      margin-bottom: 3vh;
      background: linear-gradient(135deg, rgba(0, 83, 117, 1), wheat);
      overflow-y: hidden;
      overflow-x: scroll;

      &.empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 3vh;
        font-weight: 900;
        font-style: italic;
      }

      .show_card {
        width: 27vh;
        height: 18vh;
      }
    }

    .film {
      clip-path: polygon(
        0 0,
        2% 0,
        2% 6%,
        4% 6%,
        4% 3%,
        2% 3%,
        2% 0,
        6% 0,
        6% 6%,
        8% 6%,
        8% 3%,
        6% 3%,
        6% 0,
        10% 0,
        10% 6%,
        12% 6%,
        12% 3%,
        10% 3%,
        10% 0,
        14% 0,
        14% 6%,
        16% 6%,
        16% 3%,
        14% 3%,
        14% 0,
        18% 0,
        18% 6%,
        20% 6%,
        20% 3%,
        18% 3%,
        18% 0,
        22% 0,
        22% 6%,
        24% 6%,
        24% 3%,
        22% 3%,
        22% 0,
        26% 0,
        26% 6%,
        28% 6%,
        28% 3%,
        26% 3%,
        26% 0,
        30% 0,
        30% 6%,
        32% 6%,
        32% 3%,
        30% 3%,
        30% 0,
        34% 0,
        34% 6%,
        36% 6%,
        36% 3%,
        34% 3%,
        34% 0,
        38% 0,
        38% 6%,
        40% 6%,
        40% 3%,
        38% 3%,
        38% 0,
        42% 0,
        42% 6%,
        44% 6%,
        44% 3%,
        42% 3%,
        42% 0,
        46% 0,
        46% 6%,
        48% 6%,
        48% 3%,
        46% 3%,
        46% 0,
        50% 0,
        50% 6%,
        52% 6%,
        52% 3%,
        50% 3%,
        50% 0,
        54% 0,
        54% 6%,
        56% 6%,
        56% 3%,
        54% 3%,
        54% 0,
        58% 0,
        58% 6%,
        60% 6%,
        60% 3%,
        58% 3%,
        58% 0,
        62% 0,
        62% 6%,
        64% 6%,
        64% 3%,
        62% 3%,
        62% 0,
        66% 0,
        66% 6%,
        68% 6%,
        68% 3%,
        66% 3%,
        66% 0,
        70% 0,
        70% 6%,
        72% 6%,
        72% 3%,
        70% 3%,
        70% 0,
        74% 0,
        74% 6%,
        76% 6%,
        76% 3%,
        74% 3%,
        74% 0,
        78% 0,
        78% 6%,
        80% 6%,
        80% 3%,
        78% 3%,
        78% 0,
        82% 0,
        82% 6%,
        84% 6%,
        84% 3%,
        82% 3%,
        82% 0,
        86% 0,
        86% 6%,
        88% 6%,
        88% 3%,
        86% 3%,
        86% 0,
        90% 0,
        90% 6%,
        92% 6%,
        92% 3%,
        90% 3%,
        90% 0,
        94% 0,
        94% 6%,
        96% 6%,
        96% 3%,
        94% 3%,
        94% 0,
        98% 0,
        98% 6%,
        100% 6%,
        100% 3%,
        98% 3%,
        98% 0,
        100% 0,
        100% 94%,
        98% 94%,
        98% 97%,
        100% 97%,
        100% 100%,
        96% 100%,
        96% 94%,
        94% 94%,
        94% 97%,
        96% 97%,
        96% 100%,
        92% 100%,
        92% 94%,
        90% 94%,
        90% 97%,
        92% 97%,
        92% 100%,
        88% 100%,
        88% 94%,
        86% 94%,
        86% 97%,
        88% 97%,
        88% 100%,
        84% 100%,
        84% 94%,
        82% 94%,
        82% 97%,
        84% 97%,
        84% 100%,
        80% 100%,
        80% 94%,
        78% 94%,
        78% 97%,
        80% 97%,
        80% 100%,
        76% 100%,
        76% 94%,
        74% 94%,
        74% 97%,
        76% 97%,
        76% 100%,
        72% 100%,
        72% 94%,
        70% 94%,
        70% 97%,
        72% 97%,
        72% 100%,
        68% 100%,
        68% 94%,
        66% 94%,
        66% 97%,
        68% 97%,
        68% 100%,
        64% 100%,
        64% 94%,
        62% 94%,
        62% 97%,
        64% 97%,
        64% 100%,
        60% 100%,
        60% 94%,
        58% 94%,
        58% 97%,
        60% 97%,
        60% 100%,
        56% 100%,
        56% 94%,
        54% 94%,
        54% 97%,
        56% 97%,
        56% 100%,
        52% 100%,
        52% 94%,
        50% 94%,
        50% 97%,
        52% 97%,
        52% 100%,
        48% 100%,
        48% 94%,
        46% 94%,
        46% 97%,
        48% 97%,
        48% 100%,
        44% 100%,
        44% 94%,
        42% 94%,
        42% 97%,
        44% 97%,
        44% 100%,
        40% 100%,
        40% 94%,
        38% 94%,
        38% 97%,
        40% 97%,
        40% 100%,
        36% 100%,
        36% 94%,
        34% 94%,
        34% 97%,
        36% 97%,
        36% 100%,
        32% 100%,
        32% 94%,
        30% 94%,
        30% 97%,
        32% 97%,
        32% 100%,
        28% 100%,
        28% 94%,
        26% 94%,
        26% 97%,
        28% 97%,
        28% 100%,
        24% 100%,
        24% 94%,
        22% 94%,
        22% 97%,
        24% 97%,
        24% 100%,
        20% 100%,
        20% 94%,
        18% 94%,
        18% 97%,
        20% 97%,
        20% 100%,
        16% 100%,
        16% 94%,
        14% 94%,
        14% 97%,
        16% 97%,
        16% 100%,
        12% 100%,
        12% 94%,
        10% 94%,
        10% 97%,
        12% 97%,
        12% 100%,
        8% 100%,
        8% 94%,
        6% 94%,
        6% 97%,
        8% 97%,
        8% 100%,
        4% 100%,
        4% 94%,
        2% 94%,
        2% 97%,
        4% 97%,
        4% 100%,
        0 100%,
        0 0
      );
    }
  }
  .footer_box {
    flex-shrink: 0;
    height: 10vh;
  }
}
</style>
