<script>
(function(){
    // Canvas & Context
    const canvas = document.getElementById("snake");
    const ctx = canvas.getContext("2d");

    // HTML Game IDs
    const ele_score = document.getElementById("score_value");
    const speed_setting = document.getElementsByName("speed");
    const wall_setting = document.getElementsByName("wall");

    // HTML Screen IDs (div)
    const SCREEN_MENU = -1, SCREEN_GAME_OVER=1, SCREEN_SETTING=2;
    const screen_menu = document.getElementById("menu");
    const screen_game_over = document.getElementById("gameover");
    const screen_setting = document.getElementById("setting");

    // HTML Event IDs (a tags)
    const button_new_game = document.getElementById("new_game");
    const button_new_game1 = document.getElementById("new_game1");
    const button_new_game2 = document.getElementById("new_game2");
    const button_setting_menu = document.getElementById("setting_menu");
    const button_setting_menu1 = document.getElementById("setting_menu1");

    // Game Control
    const BLOCK = 20;   // Set a larger block size to make things visible
    let SCREEN = SCREEN_MENU;
    let snake = [];
    let snake_dir = 1;
    let snake_next_dir = 1;
    let snake_speed = 150;
    let food = {x: 0, y: 0};
    let score = 0;
    let wall = 1;
    let intervalId;

    // Image Objects for Snake and Food
    const snakeImage = new Image();
    const foodImage = new Image();

    // Load images
    snakeImage.src = "snake.png";  // Replace with your snake image URL
    foodImage.src = "food.png";    // Replace with your food image URL

    // Display Control
    const showScreen = (screen_opt) => {
        SCREEN = screen_opt;
        switch(screen_opt){
            case SCREEN_MENU:
                screen_menu.style.display = "block";
                screen_game_over.style.display = "none";
                screen_setting.style.display = "none";
                break;
            case SCREEN_GAME_OVER:
                screen_menu.style.display = "none";
                screen_game_over.style.display = "block";
                screen_setting.style.display = "none";
                break;
            case SCREEN_SETTING:
                screen_menu.style.display = "none";
                screen_game_over.style.display = "none";
                screen_setting.style.display = "block";
                break;
        }
    };

    // Actions and Events
    window.onload = function(){
        button_new_game.onclick = function(){newGame();};
        button_new_game1.onclick = function(){newGame();};
        button_new_game2.onclick = function(){newGame();};
        button_setting_menu.onclick = function(){showScreen(SCREEN_SETTING);};
        button_setting_menu1.onclick = function(){showScreen(SCREEN_SETTING);};

        // Speed and wall settings
        for (let i = 0; i < speed_setting.length; i++) {
            speed_setting[i].addEventListener("click", function () {
                if (speed_setting[i].checked) {
                    setSnakeSpeed(speed_setting[i].value);
                }
            });
        }

        for (let i = 0; i < wall_setting.length; i++) {
            wall_setting[i].addEventListener("click", function () {
                if (wall_setting[i].checked) {
                    setWall(wall_setting[i].value);
                }
            });
        }

        window.addEventListener("keydown", function(evt) {
            if(evt.code === "Space" && SCREEN === SCREEN_MENU)
                newGame();
        }, true);
    };

    // Game Loop
    const mainLoop = () => {
        let _x = snake[0].x;
        let _y = snake[0].y;
        snake_dir = snake_next_dir;

        // Direction control
        switch(snake_dir){
            case 0: _y--; break;
            case 1: _x++; break;
            case 2: _y++; break;
            case 3: _x--; break;
        }

        // Add new head to the snake
        const newHead = {x: _x, y: _y};

        // Check wall collisions
        if (wall === 1) {
            if (_x < 0 || _x >= canvas.width / BLOCK || _y < 0 || _y >= canvas.height / BLOCK) {
                gameOver();
                return;
            }
        } else {
            if (_x < 0) newHead.x = canvas.width / BLOCK - 1;
            if (_x >= canvas.width / BLOCK) newHead.x = 0;
            if (_y < 0) newHead.y = canvas.height / BLOCK - 1;
            if (_y >= canvas.height / BLOCK) newHead.y = 0;
        }

        // Check for self-collision
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === newHead.x && snake[i].y === newHead.y) {
                gameOver();
                return;
            }
        }

        // Add new head to snake
        snake.unshift(newHead);

        // Check if food is eaten
        if (newHead.x === food.x && newHead.y === food.y) {
            score++;
            ele_score.innerHTML = score;
            addFood();
        } else {
            snake.pop();
        }

        // Draw the game
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw food
        ctx.drawImage(foodImage, food.x * BLOCK, food.y * BLOCK, BLOCK, BLOCK);

        // Draw snake
        for (let i = 0; i < snake.length; i++) {
            ctx.drawImage(snakeImage, snake[i].x * BLOCK, snake[i].y * BLOCK, BLOCK, BLOCK);
        }
    };

    // Start a new game
    const newGame = () => {
        clearInterval(intervalId);
        snake = [{x: 5, y: 5}];
        snake_next_dir = 1;
        score = 0;
        ele_score.innerHTML = score;
        addFood();
        intervalId = setInterval(mainLoop, snake_speed);
        showScreen(SCREEN_MENU);
    };

    // Add random food
    const addFood = () => {
        food = {
            x: Math.floor(Math.random() * (canvas.width / BLOCK)),
            y: Math.floor(Math.random() * (canvas.height / BLOCK)),
        };
    };

    // Set speed
    const setSnakeSpeed = (speed) => {
        snake_speed = parseInt(speed);
    };

    // Set wall mode
    const setWall = (wallOpt) => {
        wall = parseInt(wallOpt);
    };

    // Game over
    const gameOver = () => {
        clearInterval(intervalId);
        showScreen(SCREEN_GAME_OVER);
    };
})();
</script>
