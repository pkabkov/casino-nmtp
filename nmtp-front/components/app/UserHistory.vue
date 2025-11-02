<script lang="ts" setup>

const games = [
    {
        name: 'Игра 1',
        totalGames: 25,
        spending: 5000,
        winnings: 6200,
        history: [
            { date: '2025-10-28', score: 450 },
            { date: '2025-10-25', score: 320 },
            { date: '2025-10-22', score: 180 }
        ]
    },
    {
        name: 'Игра 2',
        totalGames: 18,
        spending: 3600,
        winnings: 4100,
        history: [
            { date: '2025-10-29', score: 550 },
            { date: '2025-10-27', score: 290 },
            { date: '2025-10-24', score: 410 }
        ]
    },
    {
        name: 'Игра 3',
        totalGames: 31,
        spending: 6200,
        winnings: 5800,
        history: [
            { date: '2025-10-30', score: 380 },
            { date: '2025-10-26', score: 470 },
            { date: '2025-10-23', score: 210 }
        ]
    }
]
</script>

<template>
    <div class="user-history">
        <div class="history-grid">
            <div v-for="game in games" :key="game.name" class="game-column">
                <div class="game-header">
                    {{ game.name }}
                </div>
                <div class="game-stats">
                    <div class="stat-row">
                        <span class="stat-label">Всего игр:</span>
                        <span class="stat-value">{{ game.totalGames }}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Траты:</span>
                        <span class="stat-value">{{ game.spending }} ₽</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Выигрыш:</span>
                        <span class="stat-value">{{ game.winnings }} ₽</span>
                    </div>
                    <div class="stat-row history-header">
                        <span class="stat-label">История игр:</span>
                    </div>
                    <div 
                        v-for="entry in game.history" 
                        :key="entry.date" 
                        class="history-entry"
                    >
                        {{ entry.date }} : {{ entry.score }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.user-history {
    flex: 1;
    padding: 1.5rem;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.history-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}

.game-column {
    display: flex;
    flex-direction: column;
}

.game-header {
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
    padding: 1rem;
    background-color: #f8f8f8;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 1rem;
}

.game-stats {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
}

.stat-row {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.stat-label {
    font-weight: 600;
    color: #555;
    font-size: 0.95rem;
}

.stat-value {
    color: #333;
    font-size: 1rem;
    padding-left: 0.5rem;
}

.history-header {
    margin-top: 0.5rem;
    padding-top: 0.75rem;
    border-top: 1px solid #e0e0e0;
}

.history-entry {
    padding-left: 0.5rem;
    color: #666;
    font-size: 0.9rem;
    font-family: 'Courier New', monospace;
}
</style>