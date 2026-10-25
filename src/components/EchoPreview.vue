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

<style lang="less" scoped>
.echo_preview {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  padding: 0.3rem;
  padding-bottom: 1.6rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.9));
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: -1;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  transition:
    opacity 0.2s ease-in-out,
    visibility 0.2s ease-in-out;
  color: white;

  &.show {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    z-index: 20;
  }

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

  img {
    width: 100%;
    object-fit: contain;
  }

  .echo_info {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin: 0.2rem 0;
    font-size: 0.24rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .echo_title {
    width: 100%;
    margin: 0.2rem 0;
    font-size: 0.32rem;
    font-weight: bold;
    border-bottom: #fff 0.02rem solid;
  }
  .echo_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .text_content {
      width: 100%;
      margin-bottom: 0.2rem;
      font-size: 0.24rem;
      text-align: justify;
    }
    .image_content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-bottom: 0.2rem;
      img {
        width: 100%;
        object-fit: contain;
      }
      .caption {
        margin-top: 0.1rem;
        color: grey;
        font-size: 0.2rem;
      }
    }
    .link_content {
      width: 100%;
      margin-bottom: 0.2rem;
      font-size: 0.22rem;
      a {
        color: #c0c0c0;
        text-decoration: underline;
      }
    }
  }
  .echo_tag {
    width: 100%;
    font-size: 0.2rem;
    font-weight: bold;
    color: var(--brand);
  }
  .echo_modified {
    width: 100%;
    margin: 0.2rem 0;
    font-size: 0.2rem;
    color: gray;
  }
}

/* 桌面宽屏：弹层铺满加宽后的页面，文章内容限宽避免一行过长 */
@media (min-width: 1280px) {
  .echo_preview {
    width: 16rem;
    left: calc(50% - 8rem);

    /* 封面图也限宽居中 */
    > img {
      width: auto;
      max-width: 11rem;
      margin: 0 auto;
    }

    /* 标题、作者、标签、时间与正文统一限宽居中，左边缘对齐 */
    .echo_info,
    .echo_title,
    .echo_tag,
    .echo_modified,
    .echo_content {
      max-width: 11rem;
      margin-left: auto;
      margin-right: auto;
    }

    .echo_content {
      .image_content {
        img {
          width: auto;
          max-width: 11rem;
        }
      }
    }
  }
}

/* 浅色主题：文章弹层改为明亮阅读底色，文字反色，关闭按钮用品牌色 */
[data-theme='light'] .echo_preview {
  background: linear-gradient(180deg, #f7f9fb, #eef2f6);
  color: var(--text-on-surface);

  .close_wrap {
    background-color: var(--brand);
    .close_btn {
      color: var(--text-on-brand);
    }
  }

  .echo_title {
    border-bottom-color: var(--surface-border);
  }

  .echo_content .image_content .caption {
    color: var(--text-muted);
  }

  .echo_content .link_content a {
    color: var(--brand);
  }

  .echo_modified {
    color: var(--text-muted);
  }

  /* 文章内联彩色文字在浅色底上反色为可读写的深色调 */
  .echo_content .text_content[style*='color: yellow'] {
    color: #c89b3c !important;
  }
  .echo_content .text_content[style*='color: skyblue'] {
    color: #2a7bb5 !important;
  }
  .echo_content .text_content[style*='color: #4f4'] {
    color: #2e8b57 !important;
  }
  .echo_content .text_content[style*='color: #c0c0c0'] {
    color: var(--text-muted) !important;
  }
  .echo_content .text_content[style*='color: pink'] {
    color: #c2185b !important;
  }
}
</style>
