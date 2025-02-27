import Character from './Character.js';

/**
 * Player is a dynamic class that manages the data and events for objects like a player 
 * 
 * This class uses a classic Java class pattern which is nice for managing object data and events.
 * 
 * @method bindEventListeners - Binds key event listeners to handle object movement.
 * @method handleKeyDown - Handles key down events to change the object's velocity.
 * @method handleKeyUp - Handles key up events to stop the object's velocity.
 */
class Player extends Character {
    /**
     * The constructor method is called when a new Player object is created.
     * 
     * @param {Object|null} data - The sprite data for the object. If null, a default red square is used.
     */
    constructor(data) {
        super(data);
        this.keypress = data?.keypress || {up: 87, left: 65, down: 83, right: 68};
        this.currentFrame = 0;
        this.frameCount = 0;
        this.bindEventListeners();
        this.loadSprite();
    }

    /**
     * Binds key event listeners to handle object movement.
     * 
     * This method binds keydown and keyup event listeners to handle object movement.
     * The .bind(this) method ensures that 'this' refers to the object object.
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
     * Loads the sprite for the player.
     */
    loadSprite() {
        // Implement sprite loading logic here
    }

    collisionChecks() {
        // Implement collision detection logic here
    }
    // Additional methods for Player class
}

export default Player;