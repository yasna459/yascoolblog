---
layout: page
title: Game
permalink: /game/
---

<style>
    body{
    }
    .wrap{
        margin-left: auto;
        margin-right: auto;
    }

    canvas{
        display: block;
        border-style: solid;
        border-width: 10px;
        border-color: #FFFFFF;
    }
    canvas:focus{
        outline: none;
    }

    /* All screens style */
    #gameover p, #setting p, #menu p{
        font-size: 20px;
    }

    #gameover a, #setting a, #menu a{
        font-size: 30px;
        display: block;
    }

    #gameover a:hover, #setting a:hover, #menu a:hover{
        cursor: pointer;
    }

    #gameover a:hover::before, #setting a:hover::before, #menu a:hover::before{
        content: ">";
        margin-right: 10px;
    }

    #menu{
        display: block;
    }

    #gameover{
        display: none;
    }

    #setting{
        display: none;
    }

    #setting input{
        display:none;
    }

    #setting label{
        cursor: pointer;
    }

    #setting input:checked + label{
        background-color: #FFF;
        color: #000;
    }
</style>

<h2>Snake</h2>
<div class="container">
    <header class="pb-3 mb-4 border-bottom border-primary text-dark">
        <p class="fs-4">Score: <span id="score_value">0</span></p>
    </header>
    <div class="container bg-secondary" style="text-align:center;">
        <!-- Main Menu -->
        <div id="menu" class="py-4 text-light">
            <p>Welcome to Snake, press <span style="background-color: #FFFFFF; color: #000000">space</span> to begin</p>
            <a id="new_game" class="link-alert">new game</a>
            <a id="setting_menu" class="link-alert">settings</a>
        </div>
        <!-- Game Over -->
        <div id="gameover" class="py-4 text-light">
            <p>Game Over, press <span style="background-color: #FFFFFF; color: #000000">space</span> to try again</p>
            <a id="new_game1" class="link-alert">new game</a>
            <a id="setting_menu1" class="link-alert">settings</a>
        </div>
        <!-- Play Screen -->
        <canvas id="snake" class="wrap" width="320" height="320" tabindex="1"></canvas>
        <!-- Settings Screen -->
        <div id="setting" class="py-4 text-light">
            <p>Settings Screen, press <span style="background-color: #FFFFFF; color: #000000">space</span> to go back to playing</p>
            <a id="new_game2" class="link-alert">new game</a>
            <br>
            <p>Speed:
                <input id="speed1" type="radio" name="speed" value="120" checked/>
                <label for="speed1">Slow</label>
                <input id="speed2" type="radio" name="speed" value="75"/>
                <label for="speed2">Normal</label>
                <input id="speed3" type="radio" name="speed" value="35"/>
                <label for="speed3">Fast</label>
            </p>
            <p>Wall:
                <input id="wallon" type="radio" name="wall" value="1" checked/>
                <label for="wallon">On</label>
                <input id="walloff" type="radio" name="wall" value="0"/>
                <label for="walloff">Off</label>
            </p>
        </div>
    </div>
</div>

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
    let snake;
    let snake_dir;
    let snake_next_dir;
    let snake_speed;
    let food = {x: 0, y: 0};
    let score;
    let wall;

    // Display Control
    let showScreen = function(screen_opt){
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
    }

    // Actions and Events
    window.onload = function(){
        button_new_game.onclick = function(){newGame();};
        button_new_game1.onclick = function(){newGame();};
        button_new_game2.onclick = function(){newGame();};
        button_setting_menu.onclick = function(){showScreen(SCREEN_SETTING);};
        button_setting_menu1.onclick = function(){showScreen(SCREEN_SETTING);};

        // Speed and wall settings
        setSnakeSpeed(150);
        for(let i = 0; i < speed_setting.length; i++){
            speed_setting[i].addEventListener("click", function(){
                for(let i = 0; i < speed_setting.length; i++){
                    if(speed_setting[i].checked){
                        setSnakeSpeed(speed_setting[i].value);
                    }
                }
            });
        }

        setWall(1);
        for(let i = 0; i < wall_setting.length; i++){
            wall_setting[i].addEventListener("click", function(){
                for(let i = 0; i < wall_setting.length; i++){
                    if(wall_setting[i].checked){
                        setWall(wall_setting[i].value);
                    }
                }
            });
        }

        window.addEventListener("keydown", function(evt) {
            if(evt.code === "Space" && SCREEN !== SCREEN_MENU)
                newGame();
        }, true);
    }

    // Game Loop
    let mainLoop = function(){
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

        snake.pop();
        snake.unshift({x: _x, y: _y});

        if(wall === 1){
            if (snake[0].x < 0 || snake[0].x === canvas.width / BLOCK || snake[0].y < 0 || snake[0].y === canvas.height / BLOCK){
                showScreen(SCREEN_GAME_OVER);
                return;
            }
        }else{
            for(let i = 0; i < snake.length; i++){
                if(snake[i].x < 0){
                    snake[i].x = snake[i].x + (canvas.width / BLOCK);
                }
                if(snake[i].x === canvas.width / BLOCK){
                    snake[i].x = snake[i].x - (canvas.width / BLOCK);
                }
                if(snake[i].y < 0){
                    snake[i].y = snake[i].y + (canvas.height / BLOCK);
                }
                if(snake[i].y === canvas.height / BLOCK){
                    snake[i].y = snake[i].y - (canvas.height / BLOCK);
                }
            }
        }

        // Check Snake Collision
        for(let i = 1; i < snake.length; i++){
            if (snake[0].x === snake[i].x && snake[0].y === snake[i].y){
                showScreen(SCREEN_GAME_OVER);
                return;
            }
        }

        // Check if Snake Eats Food
        if(snake[0].x === food.x && snake[0].y === food.y){
            snake.push({x: food.x, y: food.y});
            score++;
            ele_score.innerHTML = score;
            addFood();
        }

        // Game Draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Snake body
        snake.forEach(function(segment) {
            ctx.fillStyle = "green"; // Temporarily using green color for snake
            ctx.fillRect(segment.x * BLOCK, segment.y * BLOCK, BLOCK, BLOCK);
        });

        // Food
        ctx.fillStyle = "red"; // Temporarily using red color for food
        ctx.fillRect(food.x * BLOCK, food.y * BLOCK, BLOCK, BLOCK);
    };

    // New Game
    function newGame(){
        showScreen(SCREEN_MENU);
        snake = [];
        snake_next_dir = 1;
        snake_dir = 1;
        score = 0;
        ele_score.innerHTML = score;
        addFood();
        snake.push({x: 10, y: 10});
        setInterval(mainLoop, snake_speed);
    }

    // Add Random Food
    function addFood(){
        let _food_x = Math.floor(Math.random() * (canvas.width / BLOCK));
        let _food_y = Math.floor(Math.random() * (canvas.height / BLOCK));
        food = {x: _food_x, y: _food_y};
    }

    // Set Speed
    function setSnakeSpeed(speed){
        snake_speed = speed;
    }

    // Set Wall
    function setWall(wallOpt){
        wall = parseInt(wallOpt);
    }
})();
</script>
