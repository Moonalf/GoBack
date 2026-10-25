<template>
  <div class="footer_nav">
    <div
      :class="'nav_item ' + (item.selected === true ? 'selected' : '')"
      v-for="(item, index) in nav"
      :key="'navitem' + index"
      role="button"
      :aria-label="item.title"
      @click="item.click2router"
    >
      <div class="nav_icon">
        <img
          :src="prefix + 'common/' + item.name + '_' + (item.selected ? 'light' : 'dark') + '.png'"
          alt=""
        />
      </div>
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const prefix = import.meta.env.BASE_URL
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const nav = ref([
  {
    title: '如初',
    name: 'home',
    selected: false,
    click2router: () => {
      router.replace('/')
    },
  },
  {
    title: '如晤',
    name: 'about',
    selected: false,
    click2router: () => {
      router.replace('about')
    },
  },
  {
    title: '如梦',
    name: 'showus',
    selected: false,
    click2router: () => {
      router.replace('showus')
    },
  },
  {
    title: '如沐',
    name: 'echo',
    selected: false,
    click2router: () => {
      router.replace('echo')
    },
  },
])
import { watch } from 'vue'
watch(
  () => route,
  (newVal, oldVal) => {
    nav.value.map((item) => {
      item.selected = false
      if (item.name === newVal.name) {
        item.selected = true
      }
      return item
    })
  },
  { deep: true, immediate: true },
)
</script>

<style lang="less" scoped>
.footer_nav {
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: calc(0.8rem + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom);
  background-color: rgba(240, 255, 255, 1);
  overflow: hidden;

  .nav_item {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: rgba(0, 83, 117, 1);
    font-size: 0.3rem;
    font-weight: bold;
    cursor: pointer;
    transition:
      color 0.2s ease-in-out,
      background-color 0.2s ease-in-out,
      transform 0.2s ease-in-out;
    .nav_icon {
      height: 50%;
      margin-right: 0.1rem;
      img {
        height: 100%;
        object-fit: contain;
      }
    }
    &.selected {
      background-color: rgba(0, 83, 117, 1);
      color: rgba(240, 255, 255, 1);
      transform: scale(1.04);
      font-weight: 900;
    }
  }
}

/* 桌面宽屏：底部导航收成居中悬浮胶囊，不再横跨整个页面 */
@media (min-width: 1280px) {
  .footer_nav {
    width: 100%;
    max-width: 12rem;
    height: 0.9rem;
    margin: 0.15rem auto 0.3rem;
    padding: 0.1rem;
    gap: 0.08rem;
    background-color: rgba(255, 255, 255, 0.7);
    border: 0.03rem solid rgba(255, 255, 255, 0.85);
    border-radius: 999px;
    box-shadow: 0 0.08rem 0.3rem rgba(0, 83, 117, 0.22);
    backdrop-filter: blur(10px);

    .nav_item {
      border-radius: 999px;
      font-size: 0.26rem;
      &.selected {
        transform: none;
        box-shadow: 0 0.04rem 0.12rem rgba(0, 83, 117, 0.3);
      }
    }
  }
}
</style>
