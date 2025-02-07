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

document.addEventListener('keydown', changeDirection);
function changeDirection(event) {
    // Обрабатываем нажатие клавиш, запрещая движение в противоположную сторону
    if (event.keyCode == 37 && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.keyCode == 38 && direction !== 'DOWN') direction = 'UP';
    else if (event.keyCode == 39 && direction !== 'LEFT') direction = 'RIGHT';
    else if (event.keyCode == 40 && direction !== 'UP') direction = 'DOWN';
}

function drawGame() {
    ctx.fillStyle = 'black'; // Задний фон
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Отображаем счёт
    scoreDisplay.textContent = `Очки: ${score}`;
    
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
    if (snakeX < 0) snakeX = canvas.width - box; // Вышла слева — появляется справа
    if (snakeX >= canvas.width) snakeX = 0; // Вышла справа — появляется слева
    if (snakeY < 0) snakeY = canvas.height - box; // Вышла сверху — появляется снизу
    if (snakeY >= canvas.height) snakeY = 0; // Вышла снизу — появляется сверху
    
    let newHead = { x: snakeX, y: snakeY };
    
    if (score >= 15) {
        showBanner(); // Показываем поздравительный баннер после 15 очков
        return;
    }
    
    snake.unshift(newHead); // Добавляем новую голову
    setTimeout(drawGame, 100); // Запускаем следующий кадр через 100 мс
}

drawGame(); // Запускаем игру

function showBanner() {
    document.body.innerHTML = '<div style="position:fixed; top:0; left:0; width:100%; height:100%; background:pink; display:flex; justify-content:center; align-items:center; font-size:24px;">Поздравляю с 14 февраля! 💖</div>';
}
