const box = 25;
const gridSize = 16; // Уменьшено с 20 до 16
const canvasSize = gridSize * box;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = canvasSize;
canvas.height = canvasSize;
let snake, direction, food, score, gameRunning = false;

// Устанавливаем размеры игрового поля
canvas.width = canvasSize;
canvas.height = canvasSize;

// Элементы UI
const scoreDisplay = document.createElement('div');
scoreDisplay.style.position = 'fixed';
scoreDisplay.style.top = '10px';
scoreDisplay.style.left = '50%';
scoreDisplay.style.transform = 'translateX(-50%)';
scoreDisplay.style.color = 'white';
scoreDisplay.style.fontSize = '20px';
document.body.appendChild(scoreDisplay);

// Генерация еды в пределах поля
function generateFood() {
    let newFood, collision;
    do {
        collision = false;
        newFood = { 
            x: Math.floor(Math.random() * (canvasSize / box)) * box, 
            y: Math.floor(Math.random() * (canvasSize / box)) * box 
        };
        for (let part of snake) {
            if (part.x === newFood.x && part.y === newFood.y) {
                collision = true;
                break;
            }
        }
    } while (collision);
    return newFood;
}

// Обработчик клавиатуры
function changeDirection(event) {
    if (!gameRunning) return;
    if (event.keyCode == 37 && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.keyCode == 38 && direction !== 'DOWN') direction = 'UP';
    else if (event.keyCode == 39 && direction !== 'LEFT') direction = 'RIGHT';
    else if (event.keyCode == 40 && direction !== 'UP') direction = 'DOWN';
}
document.addEventListener('keydown', changeDirection);

// Функция отрисовки игры
function drawGame() {
    if (!gameRunning) return;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    scoreDisplay.textContent = `Очки: ${score} из 10`;
    
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'lime';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == 'LEFT') snakeX -= box;
    if (direction == 'UP') snakeY -= box;
    if (direction == 'RIGHT') snakeX += box;
    if (direction == 'DOWN') snakeY += box;

    // Проход через границы экрана
    if (snakeX < 0) snakeX = canvas.width - box;
    if (snakeX >= canvas.width) snakeX = 0;
    if (snakeY < 0) snakeY = canvas.height - box;
    if (snakeY >= canvas.height) snakeY = 0;

    let newHead = { x: snakeX, y: snakeY };

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = generateFood();
    } else {
        snake.pop();
    }

    if (score >= 10) {
        showBanner();
        return;
    }
    
    snake.unshift(newHead);
    setTimeout(drawGame, 100);
}

// Кнопки сенсорного управления
function createTouchControls() {
    const controls = document.createElement('div');
    controls.style.position = 'fixed';
    controls.style.bottom = '20px';
    controls.style.left = '50%';
    controls.style.transform = 'translateX(-50%)';
    controls.style.display = 'grid';
    controls.style.gridTemplateColumns = '50px 50px 50px';
    controls.style.gridTemplateRows = '50px 50px';
    controls.style.gap = '5px';

    const upBtn = createButton('⬆️', () => { if (direction !== 'DOWN') direction = 'UP'; });
    const leftBtn = createButton('⬅️', () => { if (direction !== 'RIGHT') direction = 'LEFT'; });
    const rightBtn = createButton('➡️', () => { if (direction !== 'LEFT') direction = 'RIGHT'; });
    const downBtn = createButton('⬇️', () => { if (direction !== 'UP') direction = 'DOWN'; });

    controls.appendChild(document.createElement('div'));
    controls.appendChild(upBtn);
    controls.appendChild(document.createElement('div'));
    controls.appendChild(leftBtn);
    controls.appendChild(document.createElement('div'));
    controls.appendChild(rightBtn);
    controls.appendChild(document.createElement('div'));
    controls.appendChild(downBtn);
    controls.appendChild(document.createElement('div'));

    document.body.appendChild(controls);
}

function createButton(symbol, onClick) {
    const btn = document.createElement('button');
    btn.textContent = symbol;
    btn.style.width = '50px';
    btn.style.height = '50px';
    btn.style.fontSize = '20px';
    btn.style.borderRadius = '10px';
    btn.style.border = 'none';
    btn.style.background = 'lightgray';
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', onClick);
    return btn;
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
        Люблю тебя!<br>
        Спасибо что ты есть в моей жизни!<br>
        Дальше напиши мне в телегу, что все получилось.<br>
        <br><br>
        <button id="restartBtn" style="padding: 10px 20px; font-size: 18px; background-color: #fff; color: #000; border: none; border-radius: 5px; cursor: pointer;">Перезапустить игру</button>
    `;
    document.body.appendChild(banner);

    document.getElementById('restartBtn').addEventListener('click', startGame);
}

// Приветственный экран
function showWelcomeScreen() {
    const welcomeScreen = document.createElement('div');
    welcomeScreen.style.position = 'fixed';
    welcomeScreen.style.top = '0';
    welcomeScreen.style.left = '0';
    welcomeScreen.style.width = '100%';
    welcomeScreen.style.height = '100%';
    welcomeScreen.style.background = 'black';
    welcomeScreen.style.color = 'white';
    welcomeScreen.style.display = 'flex';
    welcomeScreen.style.flexDirection = 'column';
    welcomeScreen.style.justifyContent = 'center';
    welcomeScreen.style.alignItems = 'center';
    welcomeScreen.style.fontSize = '24px';
    welcomeScreen.innerHTML = `
        <p>🐍 Добро пожаловать в открытку!</p>
        <p>Набери 10 очков, чтобы ее увидеть</p>
        <button id="startBtn" style="padding: 10px 20px; font-size: 18px; background-color: green; color: white; border: none; border-radius: 5px; cursor: pointer;">Играть</button>
    `;
    document.body.appendChild(welcomeScreen);

    document.getElementById('startBtn').addEventListener('click', function () {
        welcomeScreen.remove();
        startGame();
    });
}

// Запуск игры
function startGame() {
    gameRunning = true;
    score = 0;
    snake = [{ x: 10 * box, y: 10 * box }];
    food = generateFood();
    direction = 'RIGHT';
    drawGame();
}

// Запускаем приветственный экран
createTouchControls();
showWelcomeScreen();
