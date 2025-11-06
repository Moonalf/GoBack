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
const showEchoPreview = (index: any) => {
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
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  height: 87vh;
  padding-top: 2vh;
  overflow-y: scroll;
  overflow-x: hidden;
  .echo_left {
    width: 50%;
  }
  .echo_right {
    width: 50%;
  }
}
</style>
