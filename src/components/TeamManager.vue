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
    <button @click="createTeam">СОЗДАТЬ КОМАНДУ</button>
    <button @click="joinTeam">ПРИСОЕДИНИТЬСЯ</button>
  </div>
</template>

<style scoped>
.team-management {
  display: flex;
  gap: 10px;
  justify-content: center;
}
button {
  padding: 10px;
  border: 2px solid black;
  background: none;
  cursor: pointer;
}
</style>