<template>
  <div class="echo">
    <div
      class="echo_card_wrap"
      v-for="(echo, index) in echos"
      :key="index"
    >
      <EchoCard
        :echo="echo"
        @show-echo-preview="showEchoPreview(index)"
      ></EchoCard>
    </div>
    <EchoPreview
      id="EchoPreview"
      :echo="echoPreview"
      @close-echo-preview="closeEchoPreview"
    ></EchoPreview>
  </div>
</template>

<script lang="ts" setup>
import echos from '@/utils/echos'
import EchoCard from '@/components/EchoCard.vue'
import EchoPreview from '@/components/EchoPreview.vue'
defineOptions({
  name: 'echo',
})

import { ref } from 'vue'
const echoPreview = ref({})
const showEchoPreview = (index: number) => {
  echoPreview.value = echos[index]
  setTimeout(() => {
    const EchoPreview = document.getElementById('EchoPreview')
    EchoPreview?.classList.add('show')
  }, 200)
}
const closeEchoPreview = () => {
  const EchoPreview = document.getElementById('EchoPreview')
  EchoPreview?.classList.remove('show')
}
</script>

<style lang="less" scoped>
.echo {
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
  width: 100%;
  padding: 0.2rem;
  overflow-y: auto;
  overflow-x: hidden;

  .echo_card_wrap {
    width: calc(50% - 0.1rem);
  }
}

/* 桌面宽屏：三列 */
@media (min-width: 1280px) {
  .echo {
    gap: 0.3rem;
    padding: 0.3rem 0.5rem;
    .echo_card_wrap {
      width: calc(33.333% - 0.2rem);
      max-width: 4.6rem;
    }
  }
}
</style>
