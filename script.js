const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = 'RIGHT';
let score = 0;

const foodEmojis = ['🍎', '🍌', '🍇', '🍓', '🍊', '🍉'];

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
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)); // Убедимся, что еда не появляется на змейке
    return newFood;
}

function moveSnake() {
    let head = { ...snake[0] };
    if (direction === 'LEFT') head.x -= box;
    if (direction === 'RIGHT') head.x += box;
    if (direction === 'UP') head.y -= box;
    if (direction === 'DOWN') head.y += box;

    // Телепортация змейки на противоположную сторону
    if (head.x < 0) head.x = canvas.width - box;
    if (head.x >= canvas.width) head.x = 0;
    if (head.y < 0) head.y = canvas.height - box;
    if (head.y >= canvas.height) head.y = 0;

    // Проверка на съеденную еду
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood(); // Генерируем новую еду после поедания
    } else {
        snake.pop(); // Убираем последний сегмент, если еда не съедена
    }
    snake.unshift(head); // Добавляем новый элемент головы

    if (score >= 15) {
        showVictoryBanner(); // Если набрано 15 очков, показать победу
    }
}

let food = generateFood();

function resizeCanvas() {
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Управление с клавиатуры
document.addEventListener('keydown', changeDirection);
function changeDirection(event) {
    if (event.keyCode == 37 && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.keyCode == 38 && direction !== 'DOWN') direction = 'UP';
    else if (event.keyCode == 39 && direction !== 'LEFT') direction = 'RIGHT';
    else if (event.keyCode == 40 && direction !== 'UP') direction = 'DOWN';
}

// Сенсорное управление
let startX, startY;
canvas.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});

canvas.addEventListener('touchmove', (event) => {
    if (!startX || !startY) return;
    let diffX = event.touches[0].clientX - startX;
    let diffY = event.touches[0].clientY - startY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && direction !== 'LEFT') direction = 'RIGHT';
        else if (diffX < 0 && direction !== 'RIGHT') direction = 'LEFT';
    } else {
        if (diffY > 0 && direction !== 'UP') direction = 'DOWN';
        else if (diffY < 0 && direction !== 'DOWN') direction = 'UP';
    }
    startX = null;
    startY = null;
});

// Добавим кнопки сенсорного управления
const controlButtons = document.createElement('div');
controlButtons.style.position = 'fixed';
controlButtons.style.bottom = '20px';
controlButtons.style.left = '50%';
controlButtons.style.transform = 'translateX(-50%)';
controlButtons.style.display = 'flex';
controlButtons.style.gap = '10px';

const buttonUp = document.createElement('button');
buttonUp.innerHTML = '↑';
buttonUp.style.fontSize = '20px';
buttonUp.onclick = () => { if (direction !== 'DOWN') direction = 'UP'; };

const buttonLeft = document.createElement('button');
buttonLeft.innerHTML = '←';
buttonLeft.style.fontSize = '20px';
buttonLeft.onclick = () => { if (direction !== 'RIGHT') direction = 'LEFT'; };

const buttonRight = document.createElement('button');
buttonRight.innerHTML = '→';
buttonRight.style.fontSize = '20px';
buttonRight.onclick = () => { if (direction !== 'LEFT') direction = 'RIGHT'; };

const buttonDown = document.createElement('button');
buttonDown.innerHTML = '↓';
buttonDown.style.fontSize = '20px';
buttonDown.onclick = () => { if (direction !== 'UP') direction = 'DOWN'; };

controlButtons.append(buttonUp, buttonLeft, buttonRight, buttonDown);
document.body.appendChild(controlButtons);

function moveSnake() {
    let head = { ...snake[0] };
    if (direction === 'LEFT') head.x -= box;
    if (direction === 'RIGHT') head.x += box;
    if (direction === 'UP') head.y -= box;
    if (direction === 'DOWN') head.y += box;

    // Телепортация змейки на противоположную сторону
    if (head.x < 0) head.x = canvas.width - box;
    if (head.x >= canvas.width) head.x = 0;
    if (head.y < 0) head.y = canvas.height - box;
    if (head.y >= canvas.height) head.y = 0;

    // Проверяем на столкновение с едой
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood();
    } else {
        snake.pop();
    }

    snake.unshift(head);

    if (score >= 15) {
        showVictoryBanner();
    }
}

function showVictoryBanner() {
    clearInterval(gameInterval);
    displayBanner('💖 Поздравляю! 🎉 Ты справился с испытанием! 💖<br>Нажми, чтобы сыграть снова!');
}

function displayBanner(message) {
    const banner = document.createElement('div');
    banner.style.position = 'fixed';
    banner.style.top = '0';
    banner.style.left = '0';
    banner.style.width = '100%';
    banner.style.height = '100%';
    banner.style.background = 'rgba(0, 0, 0, 0.8)';
    banner.style.display = 'flex';
    banner.style.justifyContent = 'center';
    banner.style.alignItems = 'center';
    banner.style.color = 'white';
    banner.style.fontSize = '24px';
    banner.style.fontFamily = 'Arial, sans-serif';
    banner.style.textAlign = 'center';
    banner.innerHTML = `<div style="padding: 20px; background: red; border-radius: 20px; cursor: pointer;">${message}</div>`;
    banner.addEventListener('click', () => {
        document.body.removeChild(banner);
        restartGame();
    });
    document.body.appendChild(banner);
}

function restartGame() {
    snake = [{ x: 10 * box, y: 10 * box }];
    direction = 'RIGHT';
    score = 0;
    food = generateFood();
    gameInterval = setInterval(gameLoop, 100);
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'lightgreen';
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(segment.x, segment.y, box, box);
    });
    ctx.font = '20px Arial';
    ctx.fillText(food.emoji, food.x + 5, food.y + 15);
    ctx.fillStyle = 'white';
    ctx.fillText(`Очки: ${score}`, 10, 30);
}

function gameLoop() {
    moveSnake();
    drawGame();
}

gameInterval = setInterval(gameLoop, 100);
