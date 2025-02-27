const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GameEnv = {
    canvas,
    ctx,
    gameObjects: [],
    continueLevel: true,
    timerActive: false,
    time: 0,
    timerInterval: 1000,
    coinScore: 0,
    userID: 1,

    initialize() {
        console.log('Game environment initialized');
        requestAnimationFrame(this.gameLoop.bind(this));
    },

    gameLoop() {
        if (this.continueLevel) {
            this.update();
            this.draw();
            requestAnimationFrame(this.gameLoop.bind(this));
        }
    },

    update() {
        console.log('Updating game objects');
        this.gameObjects.forEach(obj => obj.update());
    },

    draw() {
        console.log('Drawing game objects');
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.gameObjects.forEach(obj => obj.draw());
    },

    addGameObject(obj) {
        this.gameObjects.push(obj);
    },

    removeGameObject(obj) {
        const index = this.gameObjects.indexOf(obj);
        if (index !== -1) {
            this.gameObjects.splice(index, 1);
        }
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gameObjects.forEach(obj => obj.resize());
    },

    create() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.appendChild(this.canvas);
    }
};

export default GameEnv;