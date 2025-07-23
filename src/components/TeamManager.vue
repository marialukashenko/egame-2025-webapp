<script lang="ts">
import api from '../service/api.js'
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['teamCreated', 'teamJoined'],
  setup(props, { emit }) {
    const createTeam = async () => {
      try {
        const userId = '1';
        const teamData = { userId, name: `name` };
        await api.createTeam(teamData);
        emit('teamCreated');
      } catch (error) {
        alert('Ошибка создания команды: ' + (error as Error).message);
      }
    };

    const joinTeam = async () => {
      const inviteCode = prompt('Введите код приглашения:');
      if (inviteCode) {
        try {
          await api.joinTeam(inviteCode);
          emit('teamJoined');
        } catch (error) {
          alert('Ошибка присоединения: ' + (error as Error).message);
        }
      }
    };

    return {
      createTeam,
      joinTeam,
    };
  },
});

</script>

<template>
  <div class="team-management">
    <button @click="createTeam" class="action-btn">СОЗДАТЬ КОМАНДУ</button>
    <button @click="joinTeam" class="action-btn">ПРИСОЕДИНИТЬСЯ</button>
  </div>
</template>

<style scoped>
.team-management {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 2rem auto;
}
.action-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: #00adb5;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  transition: background 0.2s;
}
.action-btn:hover {
  background: #00939a;
}
</style>