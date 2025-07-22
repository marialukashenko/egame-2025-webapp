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
</script>

<template>
  <div class="resource-list">
    <h2>Ресурсы</h2>
    <ul>
      <li v-for="(value, key) in resources" :key="key">
        <span class="resource-name">{{ resourceNames[key as keyof Resources] }}:</span>
        <span class="resource-value">{{ value }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.resource-list {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  background: #222831;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.resource-list h2 {
  margin-bottom: 1rem;
  color: #ffd369;
}
.resource-list ul {
  list-style: none;
  padding: 0;
}
.resource-list li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #393e46;
}
.resource-list li:last-child {
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