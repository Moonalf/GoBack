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
