// Простая змейка на JavaScript с баннером после 15 очков
const canvas = document.getElementById('gameCanvas'); // Получаем холст
const ctx = canvas.getContext('2d'); // Контекст рисования
const box = 20; // Размер одного блока змейки
let snake = [{ x: 10 * box, y: 10 * box }]; // Начальная позиция змейки
let direction = 'RIGHT'; // Начальное направление движения
let score = 0; // Очки

const foodEmojis = ['🍎', '🍌', '🍇', '🍓', '🍊', '🍉']; // Набор фруктов

function getRandomFood() {
    return foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
}

function generateFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box,
            emoji: getRandomFood()
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)); // Проверяем, не находится ли еда внутри змейки
    return newFood;
}

let food = generateFood(); // Генерация еды

// Фиксируем игровое поле
canvas.style.position = 'fixed';
canvas.style.top = '50%';
canvas.style.left = '50%';
canvas.style.transform = 'translate(-50%, -50%)';
canvas.style.background = '#f5e6e8'; // Нейтральный фон

// Создаём элемент для отображения счёта
const scoreDisplay = document.createElement('div');
scoreDisplay.style.position = 'fixed';
scoreDisplay.style.top = '10px';
scoreDisplay.style.left = '50%';
scoreDisplay.style.transform = 'translateX(-50%)';
scoreDisplay.style.color = 'white';
scoreDisplay.style.fontSize = '20px';
scoreDisplay.style.fontFamily = 'Arial, sans-serif';
document.body.appendChild(scoreDisplay);

// Приветственный экран
const welcomeScreen = document.createElement('div');
welcomeScreen.style.position = 'fixed';
welcomeScreen.style.top = '0';
welcomeScreen.style.left = '0';
welcomeScreen.style.width = '100%';
welcomeScreen.style.height = '100%';
welcomeScreen.style.background = 'rgba(0, 0, 0, 0.8)';
welcomeScreen.style.display = 'flex';
welcomeScreen.style.justifyContent = 'center';
welcomeScreen.style.alignItems = 'center';
welcomeScreen.style.color = 'white';
welcomeScreen.style.fontSize = '20px';
welcomeScreen.style.fontFamily = 'Arial, sans-serif';
welcomeScreen.style.textAlign = 'center';
welcomeScreen.innerHTML = '<div>❤️ Привет! Это увлекательная интерактивная открытка только для тебя. Чтобы получить послание, нужно пройти испытание и набрать 15 очков в этой странной игре, собранной на коленке (за что я извиняюсь). ❤️<br><br><button id="startGame" style="padding: 10px 20px; font-size: 18px; cursor: pointer;">Начать</button></div>';
document.body.appendChild(welcomeScreen);

document.getElementById('startGame').addEventListener('click', () => {
    welcomeScreen.style.display = 'none';
    drawGame();
});

// Сенсорное управление
const controlPanel = document.createElement('div');
controlPanel.style.position = 'fixed';
controlPanel.style.bottom = '20px';
controlPanel.style.left = '50%';
controlPanel.style.transform = 'translateX(-50%)';
controlPanel.style.display = 'grid';
controlPanel.style.gridTemplateColumns = 'repeat(3, 1fr)';
controlPanel.style.gap = '15px';
document.body.appendChild(controlPanel);

const buttons = {
    up: '⬆️',
    down: '⬇️',
    left: '⬅️',
    right: '➡️'
};

Object.entries(buttons).forEach(([dir, emoji]) => {
    const btn = document.createElement('button');
    btn.textContent = emoji;
    btn.style.fontSize = '50px'; // Увеличен размер кнопок
    btn.style.padding = '25px';
    btn.style.cursor = 'pointer';
    btn.style.width = '90px';
    btn.style.height = '90px';
    btn.style.borderRadius = '20px';
    btn.onclick = () => changeDirection({ key: dir.toUpperCase() });
    controlPanel.appendChild(btn);
});

document.addEventListener('keydown', changeDirection);
function changeDirection(event) {
    if (event.keyCode == 37 && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.keyCode == 38 && direction !== 'DOWN') direction = 'UP';
    else if (event.keyCode == 39 && direction !== 'LEFT') direction = 'RIGHT';
    else if (event.keyCode == 40 && direction !== 'UP') direction = 'DOWN';
}

// Завершающий баннер при наборе 15 очков
function showVictoryBanner() {
    const victoryBanner = document.createElement('div');
    victoryBanner.style.position = 'fixed';
    victoryBanner.style.top = '0';
    victoryBanner.style.left = '0';
    victoryBanner.style.width = '100%';
    victoryBanner.style.height = '100%';
    victoryBanner.style.background = 'rgba(0, 0, 0, 0.8)';
    victoryBanner.style.display = 'flex';
    victoryBanner.style.justifyContent = 'center';
    victoryBanner.style.alignItems = 'center';
    victoryBanner.style.color = 'white';
    victoryBanner.style.fontSize = '24px';
    victoryBanner.style.fontFamily = 'Arial, sans-serif';
    victoryBanner.style.textAlign = 'center';
    victoryBanner.innerHTML = '<div>💖 Поздравляю! 🎉 Ты справился с испытанием! 💖<br>Пусть этот день будет полон радости, любви и теплых моментов! ❤️💌</div>';
    document.body.appendChild(victoryBanner);
}
