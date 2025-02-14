// Простая змейка на JavaScript с баннером после 15 очков
const canvas = document.getElementById('gameCanvas'); // Получаем холст
const ctx = canvas.getContext('2d'); // Контекст рисования
const box = 20; // Размер одного блока змейки
let snake = [{ x: 10 * box, y: 10 * box }]; // Начальная позиция змейки
let direction = 'RIGHT'; // Начальное направление движения
let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box }; // Случайное положение еды
let score = 0; // Очки

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

// Создаём виртуальные кнопки управления
const controls = document.createElement('div');
controls.style.position = 'fixed';
controls.style.bottom = '10px';
controls.style.left = '50%';
controls.style.transform = 'translateX(-50%)';
controls.style.display = 'grid';
controls.style.gridTemplateColumns = 'repeat(3, 50px)';
controls.style.gridTemplateRows = 'repeat(2, 50px)';
controls.style.gap = '5px';
document.body.appendChild(controls);

const directions = { UP: '⬆️', LEFT: '⬅️', DOWN: '⬇️', RIGHT: '➡️' };
const buttons = {};

Object.keys(directions).forEach((dir) => {
    const btn = document.createElement('button');
    btn.textContent = directions[dir];
    btn.style.fontSize = '24px';
    btn.style.width = '50px';
    btn.style.height = '50px';
    btn.style.borderRadius = '10px';
    btn.style.border = 'none';
    btn.style.background = 'lightgray';
    btn.addEventListener('touchstart', () => {
        if ((dir === 'LEFT' && direction !== 'RIGHT') ||
            (dir === 'RIGHT' && direction !== 'LEFT') ||
            (dir === 'UP' && direction !== 'DOWN') ||
            (dir === 'DOWN' && direction !== 'UP')) {
            direction = dir;
        }
    });
    buttons[dir] = btn;
    controls.appendChild(btn);
});

controls.children[0].style.gridColumn = '2'; // Вверх в центре
controls.children[1].style.gridColumn = '1'; // Влево слева
controls.children[2].style.gridColumn = '2'; // Вниз в центре
controls.children[3].style.gridColumn = '3'; // Вправо справа

// Обработчик клавиатуры
function changeDirection(event) {
    if (event.keyCode == 37 && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.keyCode == 38 && direction !== 'DOWN') direction = 'UP';
    else if (event.keyCode == 39 && direction !== 'LEFT') direction = 'RIGHT';
    else if (event.keyCode == 40 && direction !== 'UP') direction = 'DOWN';
}
document.addEventListener('keydown', changeDirection);

// Экран с приветствием
const welcomeScreen = document.createElement('div');
welcomeScreen.style.position = 'fixed';
welcomeScreen.style.top = '0';
welcomeScreen.style.left = '0';
welcomeScreen.style.width = '100%';
welcomeScreen.style.height = '100%';
welcomeScreen.style.background = 'lightblue';
welcomeScreen.style.display = 'flex';
welcomeScreen.style.flexDirection = 'column';
welcomeScreen.style.justifyContent = 'center';
welcomeScreen.style.alignItems = 'center';
welcomeScreen.style.textAlign = 'center';
welcomeScreen.style.fontSize = '24px';
welcomeScreen.style.color = 'white';
welcomeScreen.innerHTML = `
    Привет. От меня никогда не будет банальных открыток. <br>
    Придется немного пострадать, чтобы набрать 15 очков в этой чудесной и кривой игре.
    <br><br>
    <button id="startBtn" style="padding: 10px 20px; font-size: 18px; background-color: #fff; color: #000; border: none; border-radius: 5px; cursor: pointer;">Начать игру</button>
`;
document.body.appendChild(welcomeScreen);

document.getElementById('startBtn').addEventListener('click', function () {
    welcomeScreen.style.display = 'none'; // Скрыть приветственный экран
    drawGame(); // Начать игру
});

function drawGame() {
    ctx.fillStyle = 'black'; // Задний фон
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Отображаем счёт
    scoreDisplay.textContent = `Очки: ${score}, из 15`;
    
    // Отрисовка змейки
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lime'; // Голова зелёная, тело светло-зелёное
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    
    // Отрисовка еды
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // Двигаем голову змейки
    if (direction == 'LEFT') snakeX -= box;
    if (direction == 'UP') snakeY -= box;
    if (direction == 'RIGHT') snakeX += box;
    if (direction == 'DOWN') snakeY += box;
    
    // Если змейка съела еду, увеличиваем счёт и генерируем новую еду
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
    } else {
        snake.pop(); // Убираем хвост, если не съела еду
    }
    
    // Перемещение змейки через границы экрана
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
    const banner = document.createElement('div');
    banner.style.position = 'fixed';
    banner.style.top = '0';
    banner.style.left = '0';
    banner.style.width = '100%';
    banner.style.height = '100%';
    banner.style.background = 'pink';
    banner.style.display = 'flex';
    banner.style.justifyContent = 'center';
    banner.style.alignItems = 'center';
    banner.style.fontSize = '25px';
    banner.style.color = 'white';
    banner.innerHTML = `
        Поздравляю с 14 февраля! 💖<br>
        Я люблю тебя! Спасибо что ты есть в моей жизни!<br>
        Далее можешь написать в тележку исполнителю.<br>
        <br><br>
        <button id="restartBtn" style="padding: 10px 20px; font-size: 18px; background-color: #fff; color: #000; border: none; border-radius: 5px; cursor: pointer;">Перезапустить игру</button>
    `;
    document.body.appendChild(banner);

    document.getElementById('restartBtn').addEventListener('click', function () {
        banner.style.display = 'none'; // Скрыть баннер
        score = 0; // Сбросить очки
        snake = [{ x: 10 * box, y: 10 * box }]; // Перезапустить змейку
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box }; // Новая еда
        direction = 'RIGHT'; // Начальное направление
        drawGame(); // Начать игру заново
    });
}
