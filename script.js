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

drawGame();

function showBanner() {
    document.body.innerHTML = '<div style="position:fixed; top:0; left:0; width:100%; height:100%; background:pink; display:flex; justify-content:center; align-items:center; font-size:24px;">Поздравляю с 14 февраля! 💖</div>';
}
