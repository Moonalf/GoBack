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

<style lang="less" scoped>
.showus {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 87vh;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 0;

  .showus_block_wrap {
    position: relative;
    width: 100%;
    margin: 3vh 0;
    z-index: 0;

    &:first-child {
      .ring_front_wrap {
        display: none;
      }
    }
    &:last-child {
      margin-bottom: 13vh;
      .ring_back_wrap {
        display: none;
      }
    }

    &.left {
      .showus_block {
        transform: rotate(-5deg) translateX(-0.5vh);
      }
      .ring_front_wrap {
        right: 5vh;
      }
      .ring_back_wrap {
        left: 5.5vh;
      }
    }

    &.right {
      .showus_block {
        transform: rotate(5deg) translateX(0.5vh);
      }
      .ring_front_wrap {
        left: 3vh;
      }
      .ring_back_wrap {
        right: 2.5vh;
      }
    }

    .ring_front_wrap {
      box-sizing: border-box;
      position: absolute;
      top: -7vh;
      width: 2.5vh;
      height: 8vh;
      overflow: hidden;
      z-index: 3;

      .ring_front {
        box-sizing: border-box;
        width: 5vh;
        height: 8vh;
        border-radius: 50%;
        border: rgba(0, 83, 117, 1) 1vh solid;
      }
    }

    .ring_back_wrap {
      box-sizing: border-box;
      position: absolute;
      bottom: -7vh;
      width: 2.5vh;
      height: 8vh;
      overflow: hidden;
      z-index: -1;

      .ring_back {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        right: 0;
        width: 5vh;
        height: 8vh;
        border-radius: 50%;
        border: rgba(0, 83, 117, 1) 1vh solid;
      }
    }

    .showus_block {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      width: 100%;
      background-color: #ffffff80;
      border-radius: 2vh;
      border: #fff 0.5vh solid;
      z-index: 1;

      .year_wrap {
        position: relative;
        width: 90%;
        margin-bottom: 3vh;

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
          font-weight: bold;
          transform: translateX(-50%);
        }
      }

      .show_card_list {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
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
  }

  .footer_box {
    flex-shrink: 0;
    height: 10vh;
  }
}
</style>
