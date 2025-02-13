// Простая змейка на JavaScript с баннером после 15 очков
const canvas = document.getElementById('gameCanvas'); // Получаем холст
const ctx = canvas.getContext('2d'); // Контекст рисования
const box = 20; // Размер одного блока змейки
let snake = [{ x: 10 * box, y: 10 * box }]; // Начальная позиция змейки
let direction = 'RIGHT'; // Начальное направление движения
let food = generateFood(); // Генерация еды
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

// Фиксируем игровое поле
canvas.style.position = 'fixed';
canvas.style.top = '50%';
canvas.style.left = '50%';
canvas.style.transform = 'translate(-50%, -50%)';

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
welcomeScreen.innerHTML = '<div>Привет. Это увлекательная интерактивная открытка только для тебя. Чтобы получить послание, нужно пройти испытание и набрать 15 очков в этой странной игре, собранной на коленке (за что я извиняюсь).<br><br><button id="startGame" style="padding: 10px 20px; font-size: 18px; cursor: pointer;">Начать</button></div>';
document.body.appendChild(welcomeScreen);

document.getElementById('startGame').addEventListener('click', () => {
    welcomeScreen.style.display = 'none';
    drawGame();
});

document.addEventListener('keydown', changeDirection);
function changeDirection(event) {
    if (event.keyCode == 37 && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.keyCode == 38 && direction !== 'DOWN') direction = 'UP';
    else if (event.keyCode == 39 && direction !== 'LEFT') direction = 'RIGHT';
    else if (event.keyCode == 40 && direction !== 'UP') direction = 'DOWN';
}

function drawGame() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    scoreDisplay.textContent = `Очки: ${score}`;
    
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lime';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    
    ctx.font = '20px Arial';
    ctx.fillText(food.emoji, food.x + 5, food.y + 15);
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    if (direction == 'LEFT') snakeX -= box;
    if (direction == 'UP') snakeY -= box;
    if (direction == 'RIGHT') snakeX += box;
    if (direction == 'DOWN') snakeY += box;
    
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = generateFood();
    } else {
        snake.pop();
    }
    
    if (snakeX < 0) snakeX = canvas.width - box;
    if (snakeX >= canvas.width) snakeX = 0;
    if (snakeY < 0) snakeY = canvas.height - box;
    if (snakeY >= canvas.height) snakeY = 0;
    
    let newHead = { x: snakeX, y: snakeY };
    
    if (score >= 15) {
        showBanner();
        return;
    }
    
    snake.unshift(newHead);
    setTimeout(drawGame, 100);
}

function showBanner() {
    document.body.innerHTML = '<div style="position:fixed; top:0; left:0; width:100%; height:100%; background:pink; display:flex; justify-content:center; align-items:center; font-size:24px;">Поздравляю с 14 февраля! 💖</div>';
}
