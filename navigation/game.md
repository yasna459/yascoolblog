---
layout: page
title: Game
permalink: /game/
---

<div id="game-container">
  <canvas id="gameCanvas" width="400" height="400"></canvas>
</div>

<script>
  // Basic Cross-the-Road Game Code
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  // Game variables
  let player = { x: 180, y: 360, size: 20 };
  let obstacles = [];
  let gameRunning = true;

  // Draw player
  function drawPlayer() {
    ctx.fillStyle = "pink"; // Girly pink theme
    ctx.fillRect(player.x, player.y, player.size, player.size);
  }

  // Draw obstacles
  function drawObstacles() {
    ctx.fillStyle = "red";
    obstacles.forEach((obs) => {
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      obs.y += 2; // Move down
      if (obs.y > 400) obs.y = -20; // Reset when offscreen
    });
  }

  // Move player
  document.addEventListener("keydown", (e) => {
    if (!gameRunning) return;
    if (e.key === "ArrowLeft" && player.x > 0) player.x -= 20;
    if (e.key === "ArrowRight" && player.x < 380) player.x += 20;
    if (e.key === "ArrowUp" && player.y > 0) player.y -= 20;
    if (e.key === "ArrowDown" && player.y < 380) player.y += 20;
  });

  // Initialize obstacles
  for (let i = 0; i < 5; i++) {
    obstacles.push({ x: Math.random() * 380, y: -i * 100, width: 20, height: 20 });
  }

  // Game loop
  function gameLoop() {
    if (!gameRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
    checkCollision();
    requestAnimationFrame(gameLoop);
  }

  // Collision detection
  function checkCollision() {
    obstacles.forEach((obs) => {
      if (
        player.x < obs.x + obs.width &&
        player.x + player.size > obs.x &&
        player.y < obs.y + obs.height &&
        player.y + player.size > obs.y
      ) {
        alert("Game Over!");
        gameRunning = false;
      }
    });
  }

  gameLoop();
</script>

<style>
  #game-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    border: 2px solid pink;
    background-color: #f9f0ff;
  }
  canvas {
    background-color: #dff8ff;
  }
</style>
