// Простая змейка на JavaScript с баннером после 15 очков
const canvas = document.getElementById('gameCanvas');
if (!canvas) {
    console.error("Canvas element not found!");
} else {
    const ctx = canvas.getContext('2d');
    const box = 20;
    let snake = [{ x: 10 * box, y: 10 * box }];
    let direction = 'RIGHT';
    let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
    let score = 0;

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
        
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i === 0) ? 'green' : 'lime';
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
        
        if (snakeX == food.x && snakeY == food.y) {
            score++;
            food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
        } else {
            snake.pop();
        }
        
        let newHead = { x: snakeX, y: snakeY };
        if (score >= 15) {
            showBanner();
            return;
        }
        snake.unshift(newHead);
        setTimeout(drawGame, 100);
    }

    drawGame();
}

function showBanner() {
    document.body.innerHTML = '<div style="position:fixed; top:0; left:0; width:100%; height:100%; background:pink; display:flex; justify-content:center; align-items:center; font-size:24px;">Поздравляю с 14 февраля! 💖</div>';
}
