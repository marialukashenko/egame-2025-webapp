<template>
  <div class="dropdown-block">
    <div class="dropdown-header" @click="toggleTeam">
      <span>Состав команды</span>
      <span class="arrow">{{ teamOpen ? '▲' : '▼' }}</span>
    </div>
    <div v-if="teamOpen" class="dropdown-content">
      <ul class="team-members-list">
        <li v-for="user in userTeam.users" :key="user.id">
          {{ user.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// Mocked user and team for demonstration
const userTeam = ref({
  id: 'team1',
  inviteCode: 'ABC123',
  users: [
    { id: '1', name: 'Пользователь 1' },
    { id: '2', name: 'Пользователь 2' },
    { id: '3', name: 'Пользователь 3' },
  ],
});
const teamOpen = ref(false);
function toggleTeam() {
  teamOpen.value = !teamOpen.value;
}
</script>

<style scoped>
.dropdown-block {
  max-width: 400px;
  margin: 2rem auto;
  background: #23272e;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
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
.team-members-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.team-members-list li {
  color: #00adb5;
  padding: 0.4rem 0;
  border-bottom: 1px solid #393e46;
  font-size: 1rem;
}
.team-members-list li:last-child {
  border-bottom: none;
}
</style> 