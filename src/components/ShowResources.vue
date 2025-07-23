<script setup lang="ts">
import api from '../service/api.js'
import { ref } from 'vue';
import type { Resources } from '../types/types';

const resources = ref<Resources>({
  wood: 10,
  copper: 5,
  iron: 8,
});

const resourceNames: Record<keyof Resources, string> = {
  wood: 'Древесина',
  copper: 'Медь',
  iron: 'Железо',
};

const open = ref(false);
function toggle() {
  open.value = !open.value;
}
</script>

<template>
  <div class="dropdown-block">
    <div class="dropdown-header" @click="toggle">
      <span>Ресурсы</span>
      <span class="arrow">{{ open ? '▲' : '▼' }}</span>
    </div>
    <div v-if="open" class="dropdown-content">
      <ul>
        <li v-for="(value, key) in resources" :key="key">
          <span class="resource-name">{{ resourceNames[key as keyof Resources] }}:</span>
          <span class="resource-value">{{ value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.dropdown-block {
  max-width: 400px;
  margin: 2rem auto;
  background: #222831;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 1rem;
  cursor: pointer;
  color: #ffd369;
  font-weight: 600;
  font-size: 1.1rem;
  border-bottom: 1px solid #393e46;
  user-select: none;
}
.dropdown-content {
  padding: 1rem;
}
.arrow {
  font-size: 1.1rem;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #393e46;
}
li:last-child {
  border-bottom: none;
}
.resource-name {
  color: #ffd369;
}
.resource-value {
  color: #00adb5;
  font-weight: bold;
}
</style>