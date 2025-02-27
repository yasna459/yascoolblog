import GameEnv from './GameEnv.js';

/**
 * The GameObject class serves as a base class for all game objects.
 * It mimics an interface by defining abstract methods that must be implemented
 * by any subclass. This ensures that all game objects have a consistent interface
 * and can be managed uniformly within GameControl.js.
 * 
 * @class GameObject
 * @method draw - Draws the object on the canvas. Must be implemented by subclasses.
 * @method update - Updates the object's state. Must be implemented by subclasses.
 * @method resize - Resizes the object based on the canvas size. Must be implemented by subclasses.
 * @method destroy - Removes the object from the game environment. Must be implemented by subclasses.
 * @method collisionChecks - Checks for collisions with other game objects.
 * @method isCollision - Detects collisions with other game objects.
 * @method handleCollisionEvent - Updates the collisions array when player is touching the object.
 * @method handleReaction - Handles player reaction / state updates to the collision.
 */
class GameObject {
    /**
     * Constructor for the GameObject class.
     * Throws an error if an attempt is made to instantiate this class directly,
     * as it is intended to be used as a base class.
     */
    constructor(data) {
        if (new.target === GameObject) {
            throw new TypeError("Cannot construct GameObject instances directly");
        }
        if (!data) {
            throw new Error("Data object is required for GameObject initialization.");
        }
        this.id = data.id || '';
        this.greeting = data.greeting || '';
        this.src = data.src || '';
        this.SCALE_FACTOR = data.SCALE_FACTOR || 1;
        this.STEP_FACTOR = data.STEP_FACTOR || 1;
        this.ANIMATION_RATE = data.ANIMATION_RATE || 1;
        this.INIT_POSITION = data.INIT_POSITION || { x: 0, y: 0 };
        this.pixels = data.pixels || { height: 0, width: 0 };
        this.orientation = data.orientation || { rows: 1, columns: 1 };
        this.down = data.down || { row: 0, start: 0, columns: 1 };
        this.left = data.left || { row: 0, start: 0, columns: 1 };
        this.right = data.right || { row: 0, start: 0, columns: 1 };
        this.up = data.up || { row: 0, start: 0, columns: 1 };
        this.hitbox = data.hitbox || { widthPercentage: 1, heightPercentage: 1 };
        this.keypress = data.keypress || { up: 0, left: 0, down: 0, right: 0 };
        this.quiz = data.quiz || null;

        this.position = { ...this.INIT_POSITION };
        this.velocity = { x: 0, y: 0 };
        this.state = {
            movement: { up: true, down: true, left: true, right: true },
            collisionEvents: []
        };

        this.loadSprite();
    }

    /**
     * Loads the sprite image for the game object.
     */
    loadSprite() {
        this.image = new Image();
        this.image.src = this.src;
    }

    /**
     * Updates the game object's state, including movement, collision handling, and reaction.
     */
    update() {
        this.handleMovement();
        this.handleCollision();
        this.handleReaction();
    }

    /**
     * Handles the movement of the game object based on keypress events.
     */
    handleMovement() {
        if (this.keypress) {
            document.addEventListener('keydown', (event) => {
                switch (event.keyCode) {
                    case this.keypress.up:
                        if (this.state.movement.up) this.velocity.y = -this.STEP_FACTOR;
                        break;
                    case this.keypress.down:
                        if (this.state.movement.down) this.velocity.y = this.STEP_FACTOR;
                        break;
                    case this.keypress.left:
                        if (this.state.movement.left) this.velocity.x = -this.STEP_FACTOR;
                        break;
                    case this.keypress.right:
                        if (this.state.movement.right) this.velocity.x = this.STEP_FACTOR;
                        break;
                }
            });

            document.addEventListener('keyup', (event) => {
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
            });
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    /**
     * Placeholder for collision detection logic.
     */
    handleCollision() {
        // Implement collision detection logic here
        // Update this.state.collisionEvents based on detected collisions
    }

    /**
     * Handles the reaction of the game object based on collision events.
     */
    handleReaction() {
        // handle player reaction based on collision type
        if (this.state.collisionEvents.length > 0) {
            const touchPoints = this.collisionData.touchPoints.this;

            // Reset movement to allow all directions initially
            this.state.movement = { up: true, down: true, left: true, right: true };

            if (touchPoints.top) {
                this.state.movement.down = false;
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                }
            }

            if (touchPoints.bottom) {
                this.state.movement.up = false;
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                }
            }

            if (touchPoints.right) {
                this.state.movement.left = false;
                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                }
            }

            if (touchPoints.left) {
                this.state.movement.right = false;
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                }
            }
        }
    }

    /**
     * Draws the game object on the canvas.
     */
    draw() {
        GameEnv.ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.pixels.width * this.SCALE_FACTOR,
            this.pixels.height * this.SCALE_FACTOR
        );
    }

    /**
     * Resizes the game object based on the canvas size.
     * This method must be implemented by subclasses.
     * @abstract
     */
    resize() {
        throw new Error("Method 'resize()' must be implemented.");
    }

    /**
     * Removes the game object from the game environment.
     * This method must be implemented by subclasses.
     * @abstract
     */
    destroy() {
        throw new Error("Method 'destroy()' must be implemented.");
    }

    /**
     * Checks for collisions with other game objects.
     * This method must be implemented by subclasses.
     * @abstract
     */
    collisionChecks() {
        throw new Error("Method 'collisionChecks()' must be implemented.");
    }

    /**
     * Detects collisions with other game objects.
     * This method must be implemented by subclasses.
     * @abstract
     */
    isCollision() {
        throw new Error("Method 'isCollision()' must be implemented.");
    }

    /**
     * Updates the collisions array when player is touching the object.
     * This method must be implemented by subclasses.
     * @abstract
     */
    handleCollisionEvent() {
        throw new Error("Method 'handleCollisionEvent()' must be implemented.");
    }
}

export default GameObject;