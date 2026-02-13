<template>
  <div class="home">
    <LoadingLayer id="loadingLayer"></LoadingLayer>
    <Banner></Banner>
    <div class="home_container">
      <div class="home_text">
        哈尔滨工业大学（深圳）学生艺术团话剧部（告白话剧社），于2015年9月成立。自成立以来，话剧部始终朝着先进艺术社团的方向探索前行，始终为丰富校园生活、发展戏剧文化不懈追求和努力着。
      </div>
      <div class="home_text">
        本网站由第五届社长『月半衔蝉（十三太保）』维护，用于记录剧社的演出活动和历代成员，在收集信息的过程中难免有疏漏错误。如果有任何需要补充、修改或删除的信息，请联系：<u
          >916824242@qq.com</u
        >
      </div>
      <div class="home_text">
        网站源码是开源的。必要的时候，或许会出现一个有缘人能接过维护网站的责任。开源地址：
      </div>
      <div class="home_text"><u>https://github.com/Moonalf/GoBack</u></div>
    </div>
    <div class="title">“爱的回归线”</div>
    <HistoryLine></HistoryLine>
  </div>
</template>

<script lang="ts" setup>
import Banner from '@/components/Banner.vue'
import LoadingLayer from '@/components/LoadingLayer.vue'
import HistoryLine from '@/components/HistoryLine.vue'
import { onMounted } from 'vue'
defineOptions({
  name: 'home',
})
onMounted(() => {
  setTimeout(() => {
    const loadingLayer = document.getElementById('loadingLayer')
    loadingLayer?.classList.add('fade')
  }, 1500)
})
</script>

<style lang="less" scoped>
.home {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .home_container {
    width: 90%;
    margin: 0.3rem 0;
    .home_text {
      font-size: 0.24rem;
      color: black;
      text-align: justify;
      text-indent: 0.4rem;
    }
  }
  .title {
    width: 100%;
    margin: 0.3rem 0;
    font-size: 0.3rem;
    color: rgba(0, 83, 117, 1);
    font-weight: bold;
    font-style: italic;
    text-align: center;
  }
}
</style>
