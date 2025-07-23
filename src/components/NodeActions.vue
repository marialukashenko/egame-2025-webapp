<template>
  <div class="node-actions-list">
    <!-- Actions Dropdown Block -->
    <div class="dropdown-block">
      <div class="dropdown-header" @click="toggleActions">
        <span>Действия над узлом</span>
        <span class="arrow">{{ actionsOpen ? '▲' : '▼' }}</span>
      </div>
      <div v-if="actionsOpen" class="dropdown-content">
        <div class="input-group">
          <label for="node-id">Введите ID узла:</label>
          <input
            id="node-id"
            v-model="inputValue"
            @keyup.enter="confirmInput"
            @blur="confirmInput"
            placeholder="Введите ID узла"
            type="text"
            class="node-input"
          />
        </div>

        <div v-if="showButtons" class="node-info-block">
          Тип узла:
        </div>
        <div v-if="showButtons" class="node-info-block">
          Атака:
        </div>
        <div v-if="showButtons" class="node-info-block">
          Уровень:
        </div>

        <div v-if="showButtons" class="actions">
          <button class="action-btn" @click="openDialog(1)">Улучшить узел</button>
          <button class="action-btn" @click="openDialog(2)">Объявить атаку</button>
          <button class="action-btn" @click="openDialog(3)">Изменить тип узла</button>
        </div>
      </div>
    </div>

    <!-- Dialogs (unchanged) -->
    <div v-if="dialogOpen === 1" class="dialog-overlay" @click.self="closeDialog">
      <div class="dialog">
        <h3>Улучшение</h3>
        <p>ID узла: <span class="node-id">{{ nodeId }}</span></p>
        <div v-if="showButtons" class="node-info-block">
          Стоимость улучшения:
        </div>
        <div class="dialog-actions">
          <button class="cancel-btn" @click="closeDialog">Выйти без изменений</button>
          <button class="confirm-btn" @click="confirmDialog(1)">Подтвердить</button>
        </div>
      </div>
    </div>
    <div v-if="dialogOpen === 2" class="dialog-overlay" @click.self="closeDialog">
      <div class="dialog">
        <h3>Атака</h3>
        <p>ID атакующего узла: <span class="node-id">{{ nodeId }}</span></p>
        <div class="input-group">
          <label for="attacked-node-id">ID атакуемого узла:</label>
          <input
            id="attacked-node-id"
            v-model="attackedNodeId"
            placeholder="Введите ID атакуемого узла"
            type="text"
            class="node-input"
          />
          <div class="attack-price">Стоимость атаки:</div>
        </div>
        <div class="dialog-actions">
          <button class="cancel-btn" @click="closeDialog">Выйти без изменений</button>
          <button class="confirm-btn" @click="confirmDialog(2)">Подтвердить</button>
        </div>
      </div>
    </div>
    <div v-if="dialogOpen === 3" class="dialog-overlay" @click.self="closeDialog">
      <div class="dialog">
        <h3>Изменить тип узла</h3>
        <p>ID узла: <span class="node-id">{{ nodeId }}</span></p>
        <div class="type-buttons-group">
          <button
            v-for="type in nodeTypes"
            :key="type.value"
            :class="['type-btn', { selected: selectedType === type.value }]"
            @click="selectType(type.value)"
          >
            {{ type.label }}
          </button>
        </div>
        <div v-if="selectedType" class="attack-price">
          Стоимость: {{ typePrices[selectedType] }}
        </div>
        <div class="dialog-actions">
          <button class="cancel-btn" @click="closeDialog">Выйти без изменений</button>
          <button class="confirm-btn" @click="confirmDialog(3)">Подтвердить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const actionsOpen = ref(true);
function toggleActions() {
  actionsOpen.value = !actionsOpen.value;
}

const inputValue = ref('');
const nodeId = ref('');
const showButtons = ref(false);
const dialogOpen = ref<number | null>(null);
const attackedNodeId = ref('');

const nodeTypes = [
  { value: 'attack', label: 'Атака' },
  { value: 'help', label: 'Помощь' },
  { value: 'defence', label: 'Защита' },
  { value: 'regular', label: 'Обычный' },
];
const selectedType = ref('');
const typePrices: Record<string, string> = {
  attack: '100',
  help: '80',
  defence: '120',
  regular: '50',
};

function selectType(type: string) {
  selectedType.value = type;
}

function confirmInput() {
  const trimmed = inputValue.value.trim();
  if (trimmed && trimmed !== nodeId.value) {
    nodeId.value = trimmed;
    showButtons.value = true;
  } else if (!trimmed) {
    showButtons.value = false;
    nodeId.value = '';
  }
}

function openDialog(num: number) {
  dialogOpen.value = num;
  if (num !== 2) attackedNodeId.value = '';
  if (num !== 3) selectedType.value = '';
}

function closeDialog() {
  dialogOpen.value = null;
}

function confirmDialog(num: number) {
  if (num === 2) {
    console.log(`Attack confirmed: from node ${nodeId.value} to node ${attackedNodeId.value}`);
  } else if (num === 3) {
    console.log(`Type change confirmed: node ${nodeId.value} to type ${selectedType.value}`);
  } else {
    console.log(`Dialog ${num} confirmed for node ID:`, nodeId.value);
  }
  closeDialog();
}
</script>

<style scoped>
.node-actions-list {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  background: #222831;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.node-actions-list h2 {
  margin-bottom: 1rem;
  color: #ffd369;
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  align-items: flex-start;
}
label {
  color: #ffd369;
  font-weight: 500;
  text-align: left;
}
.node-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #393e46;
  border-radius: 6px;
  background: #393e46;
  color: #ffd369;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
}
.node-input:focus {
  border: 1.5px solid #00adb5;
}
.node-info-block {
  color: #ffd369;
  margin-bottom: 0.25rem;
  text-align: left;
  width: 100%;
  padding-left: 2px;
}
.actions {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
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
  min-width: 250px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
  color: #ffd369;
  text-align: center;
}
.node-id {
  color: #00adb5;
  font-weight: bold;
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
.attack-price {
  color: #00adb5;
  font-size: 0.95rem;
  margin-top: 0.2rem;
  margin-left: 2px;
  text-align: left;
}
.type-buttons-group {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin: 1rem 0 0.5rem 0;
}
.type-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: #393e46;
  color: #ffd369;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
}
.type-btn.selected, .type-btn:active {
  background: #00adb5;
  color: #fff;
}
.dropdown-block {
  margin-bottom: 1.5rem;
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
</style> 