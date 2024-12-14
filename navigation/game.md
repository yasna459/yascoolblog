---
layout: base
title: Game
permalink: /game/
---

<style>
    body {
        background-color: #f8d7f1;
    }

    .wrap {
        margin: auto;
    }

    canvas {
        display: none;
        border-style: solid;
        border-width: 10px;
        border-color: #ff91b6;
    }

    canvas:focus {
        outline: none;
    }

    #gameover p, #setting p, #menu p {
        font-size: 20px;
        color: #ff91b6;
    }

    #gameover a, #setting a, #menu a {
        font-size: 30px;
        display: block;
        color: #ffffff;
        text-decoration: none;
        background-color: #ff91b6;
        text-align: center;
        border-radius: 5px;
        padding: 10px;
    }

    #gameover a:hover, #setting a:hover, #menu a:hover {
        cursor: pointer;
        background-color: #ffc1e3;
    }

    #menu {
        display: block;
    }

    #gameover {
        display: none;
    }

    #setting {
        display: none;
    }

    #setting input {
        display: none;
    }

    #setting label {
        cursor: pointer;
        background-color: #ff91b6;
        color: #ffffff;
        padding: 5px 10px;
        border-radius: 5px;
        margin: 0 5px;
    }

    #setting input:checked + label {
        background-color: #ffc1e3;
        color: #000;
    }

    header p {
        font-size: 24px;
        color: #ffffff;
    }
</style>

<div class="container">
    <header class="pb-3 mb-4 border-bottom border-primary text-dark">
        <p class="fs-4">Score: <span id="score_value">0</span></p>
    </header>
    <div class="container bg-secondary" style="text-align: center;">
        <!-- Main Menu -->
        <div id="menu" class="py-4 text-light">
            <p>Welcome to Snake, press <span style="background-color: #FFFFFF; color: #000000">space</span> to begin</p>
            <a id="new_game">New Game</a>
            <a id="setting_menu">Settings</a>
        </div>
        <!-- Game Over -->
        <div id="gameover" class="py-4 text-light">
            <p>Game Over, press <span style="background-color: #FFFFFF; color: #000000">space</span> to try again</p>
            <a id="new_game1">New Game</a>
            <a id="setting_menu1">Settings</a>
        </div>
        <!-- Game Screen -->
        <canvas id="snake" class="wrap" width="320" height="320" tabindex="1"></canvas>
        <!-- Settings Screen -->
        <div id="setting" class="py-4 text-light">
            <p>Settings Screen, press <span style="background-color: #FFFFFF; color: #000000">space</span> to go back to playing</p>
            <a id="new_game2">New Game</a>
            <p>Speed:
                <input id="speed1" type="radio" name="speed" value="120" checked />
                <label for="speed1">Slow</label>
                <input id="speed2" type="radio" name="speed" value="75" />
                <label for="speed2">Normal</label>
                <input id="speed3" type="radio" name="speed" value="35" />
                <label for="speed3">Fast</label>
            </p>
            <p>Wall:
                <input id="wallon" type="radio" name="wall" value="1" checked />
                <label for="wallon">On</label>
                <input id="walloff" type="radio" name="wall" value="0" />
                <label for="walloff">Off</label>
            </p>
        </div>
    </div>
</div>

<script>
    (function () {
        const canvas = document.getElementById("snake");
        const ctx = canvas.getContext("2d");
        const BLOCK = 10;

        const foodImg = new Image();
        const snakeImg = new Image();

        foodImg.src = "images/food.png"; // Replace with your image path
        snakeImg.src = "images/snake.png"; // Replace with your image path

        const SCREEN_MENU = -1, SCREEN_GAME_OVER = 1, SCREEN_SETTING = 2, SCREEN_SNAKE = 0;
        let SCREEN = SCREEN_MENU;

        const snake = [];
        let snakeDir = 1, nextDir = 1, snakeSpeed = 150, wall = 1, score = 0, food = { x: 0, y: 0 };

        const screens = {
            menu: document.getElementById("menu"),
            gameover: document.getElementById("gameover"),
            setting: document.getElementById("setting"),
            snake: canvas,
        };

        const buttons = {
            newGame: [document.getElementById("new_game"), document.getElementById("new_game1"), document.getElementById("new_game2")],
            setting: [document.getElementById("setting_menu"), document.getElementById("setting_menu1")]
        };

        function renderScreen(screen) {
            SCREEN = screen;
            for (let key in screens) screens[key].style.display = "none";
            switch (screen) {
                case SCREEN_MENU: screens.menu.style.display = "block"; break;
                case SCREEN_GAME_OVER: screens.gameover.style.display = "block"; break;
                case SCREEN_SETTING: screens.setting.style.display = "block"; break;
                case SCREEN_SNAKE: screens.snake.style.display = "block"; break;
            }
        }

        function newGame() {
            renderScreen(SCREEN_SNAKE);
            score = 0;
            snake.length = 0;
            snake.push({ x: 0, y: 15 });
            nextDir = 1;
            placeFood();
            loop();
        }

        function loop() {
            const head = { ...snake[0] };
            snakeDir = nextDir;

            switch (snakeDir) {
                case 0: head.y--; break;
                case 1: head.x++; break;
                case 2: head.y++; break;
                case 3: head.x--; break;
            }

            if (wall === 1 && (head.x < 0 || head.x >= canvas.width / BLOCK || head.y < 0 || head.y >= canvas.height / BLOCK)) {
                renderScreen(SCREEN_GAME_OVER);
                return;
            }

            if (snake.some(part => part.x === head.x && part.y === head.y)) {
                renderScreen(SCREEN_GAME_OVER);
                return;
            }

            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                score++;
                placeFood();
            } else {
                snake.pop();
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#f8d7f1";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            snake.forEach(part => ctx.drawImage(snakeImg, part.x * BLOCK, part.y * BLOCK, BLOCK, BLOCK));
            ctx.drawImage(foodImg, food.x * BLOCK, food.y * BLOCK, BLOCK, BLOCK);

            setTimeout(loop, snakeSpeed);
        }

        function placeFood() {
            food.x = Math.floor(Math.random() * canvas.width / BLOCK);
            food.y = Math.floor(Math.random() * canvas.height / BLOCK);
        }

        window.onload = function () {
            buttons.newGame.forEach(btn => btn.onclick = newGame);
            buttons.setting.forEach(btn => btn.onclick = () => renderScreen(SCREEN_SETTING));
            renderScreen(SCREEN_MENU);

            document.addEventListener("keydown", e => {
                if (e.code === "Space" && SCREEN !== SCREEN_SNAKE) newGame();
                if (e.keyCode >= 37 && e.keyCode <= 40) nextDir = [3, 0, 1, 2][e.keyCode - 37];
            });
        };
    })();
</script>
