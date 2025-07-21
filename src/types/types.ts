export interface User {
    id: string; // Уникальный идентификатор пользователя
    name: string; // Имя пользователя
}

export interface Team {
    id: string; // Уникальный идентификатор команды
    inviteCode: string; // Код приглашения для присоединения к команде
    users: User[]; // Список пользователей в команде
}

export interface Node {
    id: string; // Уникальный идентификатор ноды
    displayNumber: number; // Отображаемый номер ноды
    type: string; // Тип ноды (например, 'Normal', 'Attack', 'Help', 'Extinguish')
    level?: number; // Уровень ноды (опционально)
    attack?: number; // Атака ноды (опционально)
    defense?: number; // Защита ноды (опционально)
    productivity?: number; // Производительность ноды (опционально)
    ownerId: string; // ID владельца ноды
    color: string; // Цвет ноды
    shape: string; // Форма ноды
    spawnProtection: boolean; // Флаг защиты при спавне
    coordinates: { x: number; y: number }; // Координаты ноды
}

export interface Edge {
    id: string; // Уникальный идентификатор ребра
    nodeIds: [string, string]; // ID двух нод, которые соединяет ребро
}

export interface Attack {
    id: string; // Уникальный идентификатор атаки
    edgeId: string; // ID ребра, на котором происходит атака
    attackingNodeId: string; // ID атакующей ноды
    color: string; // Цвет атаки
    timer: number; // Таймер атаки (в тиках)
}

export interface Resources {
    orange: number; // Количество оранжевых ресурсов
    red: number; // Количество красных ресурсов
    blue: number; // Количество синих ресурсов
}

export interface GameStatus {
    resources: Resources; // Ресурсы в банке
    actions: number; // Количество доступных действий
}

export interface Room {
    id: string; // Уникальный идентификатор комнаты
    number: number; // Номер комнаты
    resourceType: string; // Тип ресурса, связанного с комнатой
    nodes: Node[]; // Список нод в комнате
    edges: Edge[]; // Список ребер в комнате
    attacks: Attack[]; // Список активных атак в комнате
}

export interface Game {
    id: string; // Уникальный идентификатор игры
    rooms: Room[]; // Список комнат в игре
}

export interface TeamDTO {
    userId: string;
    name?: string;
}