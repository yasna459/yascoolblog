import Character from './Character.js';

/**
 * Enemy class extends Character and serves as a base class for all enemy objects.
 * 
 * This class provides common properties and methods for enemies.
 * 
 * @class Enemy
 */
class Enemy extends Character {
    /**
     * The constructor method is called when a new Enemy object is created.
     * 
     * @param {Object} data - The data object for enemy initialization.
     */
    constructor(data) {
        super(data);
        this.target = null; // Initialize target property
        console.log('Enemy initialized with position:', this.position);
    }

    /**
     * Checks the proximity of the enemy to the target.
     */
    checkProximity() {
        if (this.target && this.target.position) {
            // Implement proximity check logic here
            const distanceX = this.target.position.x - this.position.x;
            const distanceY = this.target.position.y - this.position.y;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distance < 100) { // Example proximity threshold
                console.log('Enemy is close to the target');
            }
        } else {
            console.error("Target or target position is undefined");
        }
    }

    /**
     * Chases the target.
     */
    chase() {
        if (this.target && this.target.position) {
            // Implement chase logic here
            const directionX = this.target.position.x - this.position.x;
            const directionY = this.target.position.y - this.position.y;
            const magnitude = Math.sqrt(directionX * directionX + directionY * directionY);

            if (magnitude > 0) {
                this.velocity.x = (directionX / magnitude) * this.STEP_FACTOR;
                this.velocity.y = (directionY / magnitude) * this.STEP_FACTOR;
            }
        } else {
            console.error("Target or target position is undefined");
        }
    }

    /**
     * Updates the enemy's state.
     */
    update() {
        this.checkProximity();
        this.chase();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        console.log('Enemy updated position:', this.position);
        // Implement additional update logic here
    }

    // Additional methods for Enemy class
}

export default Enemy;