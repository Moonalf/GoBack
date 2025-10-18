<template>
  <div class="script_table">
    <div class="script_header">
      <div class="col1">剧本</div>
      <div class="col2">类型</div>
      <div class="col3">时长</div>
    </div>
    <div class="script_block" v-for="(scriptsPerYear, index) in scripts" :key="'script-' + index">
      <div class="year">{{ getYear(index) }}</div>
      <div
        class="script_info"
        v-for="(script, idy) in scriptsPerYear"
        :key="'script-' + index + '-' + idy"
      >
        <div class="col1">
          {{ script.name }}<span>{{ script.from }}</span>
        </div>
        <div class="col2">{{ script.type }}</div>
        <div class="col3">{{ script.duration }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import scripts from '@/utils/scripts'
import { getYear } from '@/utils/methods'
</script>

<style lang="less">
.script_table {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0 1vh;
  .script_header {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    background-color: rgba(0, 83, 117, 1);
    font-weight: bold;
    font-size: 2vh;
    text-indent: 0.5vh;
  }
  .script_block {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-indent: 0.5vh;
    .year {
      background-color: lightgray;
      font-size: 1.5vh;
      color: black;
    }
    .script_info {
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: white;
      font-size: 1.5vh;
      color: black;
    }
  }
  .col1 {
    width: 65%;
    border-right: gray 0.1vh solid;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    span {
      color: lightgray;
    }
  }
  .col2 {
    width: 20%;
    border-right: gray 0.1vh solid;
  }
  .col3 {
    width: 15%;
  }
}
</style>
