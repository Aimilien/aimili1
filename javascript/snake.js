document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const startButton = document.getElementById("startButton");
    const scoreDisplay = document.getElementById("score");
    const controls = document.getElementById("controls");

    const boxSize = 20;
    const rows = canvas.height / boxSize;
    const cols = canvas.width / boxSize;

    let snake, direction, food, score, gameInterval, gameRunning;

    function resetGame() {
        snake = [{ x: 5, y: 5 }];
        direction = { x: 0, y: 0 };
        food = generateFood();
        score = 0;
        scoreDisplay.textContent = score;
        gameRunning = false;
        draw();
    }

    function generateFood() {
        return {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows),
        };
    }

    function drawBox(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
    }

    function updateGame() {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

        if (
            head.x < 0 ||
            head.y < 0 ||
            head.x >= cols ||
            head.y >= rows ||
            snake.some(segment => segment.x === head.x && segment.y === head.y)
        ) {
            clearInterval(gameInterval);
            alert("Fin de la partie ! Votre score est de " + score);
            resetGame();
            return;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            food = generateFood();
        } else {
            snake.pop();
        }

        scoreDisplay.textContent = score;

        draw();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.forEach(segment => drawBox(segment.x, segment.y, "#c2f750"));
        drawBox(food.x, food.y, "#ff4757");
    }

    function startGame() {
        if (gameRunning) return;
        resetGame();
        gameRunning = true;
        direction = { x: 1, y: 0 };
        gameInterval = setInterval(updateGame, 150);
    }

    startButton.addEventListener("click", startGame);

    document.addEventListener("keydown", e => {
        if (!gameRunning) return;
        switch (e.key) {
            case "ArrowUp":
                if (direction.y === 0) direction = { x: 0, y: -1 };
                break;
            case "ArrowDown":
                if (direction.y === 0) direction = { x: 0, y: 1 };
                break;
            case "ArrowLeft":
                if (direction.x === 0) direction = { x: -1, y: 0 };
                break;
            case "ArrowRight":
                if (direction.x === 0) direction = { x: 1, y: 0 };
                break;
        }
    });

    controls.addEventListener("click", e => {
        if (!gameRunning) return;
        switch (e.target.id) {
            case "up":
                if (direction.y === 0) direction = { x: 0, y: -1 };
                break;
            case "down":
                if (direction.y === 0) direction = { x: 0, y: 1 };
                break;
            case "left":
                if (direction.x === 0) direction = { x: -1, y: 0 };
                break;
            case "right":
                if (direction.x === 0) direction = { x: 1, y: 0 };
                break;
        }
    });

    resetGame();
});
