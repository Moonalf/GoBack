<template>
  <div class="echo">
    <div class="echo_list">
      <div class="echo_card_wrap" v-for="(echo, index) in echos" :key="index">
        <EchoCard :echo="echo" @show-echo-preview="showEchoPreview(index)"></EchoCard>
      </div>
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
