<template>
  <div class="manager_area">
    <div v-if="managers.length > 5" class="managers">
      <ManagerCard class="vice" :manager="managers[5]" :type="1"></ManagerCard>
      <ManagerCard
        class="vice"
        v-if="managers.length > 6"
        :manager="managers[6]"
        :type="1"
      ></ManagerCard>
      <div v-else class="placeholder"></div>
    </div>
    <div v-if="managers.length > 0" class="managers">
      <ManagerCard
        class="vice"
        v-if="managers.length > 1"
        :manager="managers[1]"
        :type="1"
      ></ManagerCard>
      <ManagerCard class="master" :manager="managers[0]" :type="0"></ManagerCard>
      <ManagerCard
        class="vice"
        v-if="managers.length > 2"
        :manager="managers[2]"
        :type="1"
      ></ManagerCard>
      <div v-else class="placeholder"></div>
    </div>
    <div v-if="managers.length > 3" class="managers">
      <ManagerCard class="vice" :manager="managers[3]" :type="1"></ManagerCard>
      <ManagerCard
        class="vice"
        v-if="managers.length > 4"
        :manager="managers[4]"
        :type="1"
      ></ManagerCard>
      <div v-else class="placeholder"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ManagerCard from './ManagerCard.vue'
const props = defineProps<{
  managers: any
}>()
</script>
