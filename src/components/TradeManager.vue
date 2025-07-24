<script lang="ts">
import api from '../service/api.js'
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['tradeCreated', 'tradeRecieved'],
  setup(props, { emit }) {
    const createTrade = async () => {
      try {
        const userId = '1';
        const teamData = { userId, name: `name` };
        await api.createTrade(teamData);
        emit('tradeCreated');
      } catch (error) {
        alert('Ошибка создания обмена: ' + (error as Error).message);
      }
    };

    const recieveTrade = async () => {
      const inviteCode = prompt('Введите код обмена:');
      if (inviteCode) {
        try {
          await api.recieveTrade(inviteCode);
          emit('tradeRecieved');
        } catch (error) {
          alert('Ошибка обмена: ' + (error as Error).message);
        }
      }
    };

    return {
      createTrade,
      recieveTrade,
    };
  },
});

</script>

<template>
  <div>
    <div class="trade-actions">
      <button class="action-btn" @click="openTradeDialog">Создать обмен</button>
      <button class="action-btn" @click="receiveTrade">Принять обмен</button>
    </div>
    <div v-if="tradeDialogOpen" class="dialog-overlay" @click.self="closeTradeDialog">
      <div class="dialog">
        <h3>Создать обмен</h3>
        <div class="trade-zones">
          <div class="trade-zone">
            <div class="zone-title">Вы отдаёте:</div>
            <div class="resource-input" v-for="res in resourcesList" :key="res.key">
              <label :for="'offer-' + res.key">{{ res.label }}</label>
              <input type="number" min="0" v-model.number="offer[res.key]" :id="'offer-' + res.key" />
            </div>
          </div>
          <div class="trade-zone">
            <div class="zone-title">Вы получаете:</div>
            <div class="resource-input" v-for="res in resourcesList" :key="res.key">
              <label :for="'receive-' + res.key">{{ res.label }}</label>
              <input type="number" min="0" v-model.number="receive[res.key]" :id="'receive-' + res.key" />
            </div>
          </div>
        </div>
        <div class="dialog-actions">
          <button class="cancel-btn" @click="closeTradeDialog">Отмена</button>
          <button class="confirm-btn" @click="confirmTrade">Подтвердить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
const tradeDialogOpen = ref(false);
function openTradeDialog() {
  tradeDialogOpen.value = true;
}
function closeTradeDialog() {
  tradeDialogOpen.value = false;
}
function confirmTrade() {
  // For now, just log the trade
  console.log('Trade offer:', offer);
  console.log('Trade receive:', receive);
  closeTradeDialog();
}
function receiveTrade() {
  alert('Функция принятия обмена пока не реализована.');
}
const resourcesList = [
  { key: 'wood', label: 'Древесина' },
  { key: 'copper', label: 'Медь' },
  { key: 'iron', label: 'Железо' },
];
const offer = reactive({ wood: 0, copper: 0, iron: 0 });
const receive = reactive({ wood: 0, copper: 0, iron: 0 });
</script>

<style scoped>
.trade-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: center;
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
.dialog-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.dialog {
  background: #222831;
  padding: 2rem;
  border-radius: 10px;
  min-width: 320px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
  color: #ffd369;
  text-align: center;
}
.trade-zones {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin: 1.5rem 0;
}
.trade-zone {
  background: #23272e;
  border-radius: 8px;
  padding: 1rem 1.2rem;
  min-width: 140px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}
.zone-title {
  color: #ffd369;
  font-weight: 600;
  margin-bottom: 0.7rem;
  font-size: 1.05rem;
}
.resource-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.7rem;
}
.resource-input label {
  color: #ffd369;
  margin-right: 0.7rem;
  font-size: 1rem;
}
.resource-input input[type="number"] {
  width: 60px;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  border: 1px solid #393e46;
  background: #393e46;
  color: #ffd369;
  font-size: 1rem;
  outline: none;
  text-align: right;
}
.resource-input input[type="number"]:focus {
  border: 1.5px solid #00adb5;
}
.dialog-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}
.cancel-btn {
  padding: 0.5rem 1.2rem;
  background: #393e46;
  color: #ffd369;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}
.cancel-btn:hover {
  background: #222831;
}
.confirm-btn {
  padding: 0.5rem 1.2rem;
  background: #00adb5;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s;
}
.confirm-btn:hover {
  background: #00939a;
}
</style>