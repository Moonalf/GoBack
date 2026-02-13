<template>
  <div class="echo">
    <!-- <LoadingLayer id="loadingLayer"></LoadingLayer> -->
    <div class="echo_left">
      <EchoCard
        v-for="(echo, index) in echosGroup[0]"
        :echo="echo"
        @show-echo-preview="showEchoPreview(index * 2)"
      ></EchoCard>
    </div>
    <div class="echo_right">
      <EchoCard
        v-for="(echo, index) in echosGroup[1]"
        :echo="echo"
        @show-echo-preview="showEchoPreview(index * 2 + 1)"
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

const echosGroup: any = [[], []]
import { ref } from 'vue'
const echoPreview = ref({})
echos.forEach((echo: any, index: number) => {
  echosGroup[index % 2].push(echo)
})
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
.echo {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .echo_left {
    width: 45%;
    margin-right: 0.2rem;
  }
  .echo_right {
    width: 45%;
  }
}
</style>
