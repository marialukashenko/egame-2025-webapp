<script setup lang="ts">
import TeamManager from './components/TeamManager.vue'
import ShowResources from './components/ShowResources.vue'
import NodeActions from './components/NodeActions.vue'
import ShowMembers from './components/ShowMembers.vue'
</script>

<template>
  <TeamManager/>
  <ShowResources/>
  <ShowMembers/>
  <NodeActions/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
