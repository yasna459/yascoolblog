import GameObject from './GameObject.js';

/**
 * Character class extends GameObject and serves as a base class for all character objects.
 * 
 * This class provides common properties and methods for characters, such as velocity.
 * 
 * @class Character
 */
class Character extends GameObject {
    /**
     * Constructor for the Character class.
     * 
     * @param {Object} data - The data object for character initialization.
     */
    constructor(data) {
        super(data);
        this.velocity = { x: 0, y: 0 };
        this.position = data.INIT_POSITION || { x: 0, y: 0 }; // Initialize position
        this.currentFrame = 0;
        this.frameCount = 0;
        this.bindEventListeners();
        this.loadSprite();
    }

    /**
     * Binds key event listeners to handle object movement.
     */
    bindEventListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    /**
     * Handles key down events to change the object's velocity.
     * 
     * @param {Object} event - The keydown event.
     */
    handleKeyDown(event) {
        switch (event.keyCode) {
            case this.keypress.up:
                this.velocity.y = -this.STEP_FACTOR;
                break;
            case this.keypress.down:
                this.velocity.y = this.STEP_FACTOR;
                break;
            case this.keypress.left:
                this.velocity.x = -this.STEP_FACTOR;
                break;
            case this.keypress.right:
                this.velocity.x = this.STEP_FACTOR;
                break;
        }
    }

    /**
     * Handles key up events to stop the object's velocity.
     * 
     * @param {Object} event - The keyup event.
     */
    handleKeyUp(event) {
        switch (event.keyCode) {
            case this.keypress.up:
            case this.keypress.down:
                this.velocity.y = 0;
                break;
            case this.keypress.left:
            case this.keypress.right:
                this.velocity.x = 0;
                break;
        }
    }

    /**
     * Loads the sprite for the character.
     */
    loadSprite() {
        // Implement sprite loading logic here
    }

    /**
     * Draws the character on the canvas.
     */
    draw() {
        const ctx = GameEnv.ctx;
        const { x, y } = this.position;
        const { width, height } = this.pixels;

        if (this.image) {
            ctx.drawImage(
                this.image,
                this.currentFrame * width,
                0,
                width,
                height,
                x,
                y,
                width * this.SCALE_FACTOR,
                height * this.SCALE_FACTOR
            );
        } else {
            ctx.fillStyle = 'red';
            ctx.fillRect(x, y, width * this.SCALE_FACTOR, height * this.SCALE_FACTOR);
        }
    }

    /**
     * Updates the character's state.
     */
    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.frameCount++;
        if (this.frameCount >= this.ANIMATION_RATE) {
            this.currentFrame = (this.currentFrame + 1) % this.orientation.columns;
            this.frameCount = 0;
        }
        this.draw();
    }

    /**
     * Resizes the character based on the canvas size.
     */
    resize() {
        this.draw();
    }

    /**
     * Destroys the character and removes it from the game environment.
     */
    destroy() {
        const index = GameEnv.gameObjects.indexOf(this);
        if (index !== -1) {
            GameEnv.gameObjects.splice(index, 1);
        }
    }
}

export default Character;