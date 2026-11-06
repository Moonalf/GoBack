<template>
  <div class="echo_preview">
    <div class="close_wrap" @click="closeEchoPreview">
      <div class="close_btn">← Go back</div>
    </div>
    <div class="echo_info">
      <img :src="prefix + (echo?.avatar ?? '')" :alt="echo?.author ?? ''" />
      <div>{{ echo?.author ?? '' }}</div>
    </div>
    <img :src="prefix + (echo?.cover ?? '')" :alt="echo?.title ?? ''" />
    <div class="echo_title">{{ echo?.title ?? '' }}</div>
    <div class="echo_content" v-for="content in echo?.contents ?? []">
      <div class="text_content" v-if="content.type == 'text'" :style="content.style || ''">
        {{ content.text }}
      </div>
      <div class="image_content" v-if="content.type == 'image'">
        <img
          :src="prefix + (content?.src ?? '')"
          :alt="content?.text ?? ''"
          :style="content.style || ''"
          loading="lazy"
          decoding="async"
          @load="onImgLoad"
        />
        <div class="caption">{{ content.text }}</div>
      </div>
      <div class="link_content" v-if="content.type == 'link'">
        <a :href="content.src || ''" target="_blank" rel="noopener">{{ content.text }}</a>
      </div>
    </div>
    <div class="echo_tag">{{ '#' + (echo?.tags ?? []).join(' #') }}</div>
    <div class="echo_modified">{{ '编辑于' + (echo?.modified ?? '') }}</div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
const prefix = import.meta.env.BASE_URL
const props = defineProps<{
  echo: any
}>()

const emit = defineEmits(['closeEchoPreview'])
const closeEchoPreview = () => {
  emit('closeEchoPreview')
}

// 弹层展开时支持 ESC 关闭
const onKeydown = (e: KeyboardEvent) => {
  if (e.key !== 'Escape') return
  const preview = document.querySelector('.echo_preview')
  if (preview?.classList.contains('show')) {
    closeEchoPreview()
  }
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

const onImgLoad = (e: Event) => {
  const img = e.target as HTMLImageElement
  if (img.naturalHeight > img.naturalWidth) {
    img.style.width = '50%'
    img.style.margin = '0 auto'
  }
}
</script>
