import Character from './Character.js';
import GameEnv from './GameEnv.js';
import Player from './Player.js';

class Enemy extends Character {
    constructor(data = null, gameEnv = null) {
        super(data, gameEnv);
        this.playerFound = false;
        this.playerDestroyed = false;     
    }

    /**
     * Override the update method to draw the Enemy.
     */
    update() {
        // Update begins by drawing the object
        this.draw();

        if (!this.playerDestroyed) {
            this.checkProximityToPlayer();
            if(this.collisionChecks()){
                this.handleCollisionEvent();
            }

        }

        // Update or change position according to velocity events
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Ensure the object stays within the canvas boundaries
        this.stayWithinCanvas();
    }

    /**
     * stayWithinCanvas method ensures that the object stays within the boundaries of the canvas.
     */
    stayWithinCanvas() {
        // Bottom of the canvas
        if (this.position.y + this.height > this.gameEnv.innerHeight) {
            this.position.y = this.gameEnv.innerHeight - this.height;
            this.velocity.y = 0;
        }
        // Top of the canvas
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
        }
        // Right of the canvas
        if (this.position.x + this.width > this.gameEnv.innerWidth) {
            this.position.x = this.gameEnv.innerWidth - this.width;
            this.velocity.x = 0;
        }
        // Left of the canvas
        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x = 0;
        }
    }

    /**
     * Check if Player is within a certain distance of the Enemy.
     * if so return True else False.
     * @returns {boolean} True if Player is within a certain distance of the Enemy, False otherwise.
     */
    collisionChecks() {
        for (var gameObj of this.gameEnv.gameObjects) {
            if (gameObj.canvas && this != gameObj) {
                this.isCollision(gameObj);
                if (this.collisionData.hit && this.collisionData.touchPoints.other.id == 'Chill Guy') {
                    return true;                    
                }
            }
        }
        return false
    }

    /**
     * Handle collision event.
     * This method must be implemented by subclasses.
     * @abstract
     */
    handleCollisionEvent() {
        // To be implemented by subclasses
        throw new Error("Method 'collisionAction()' must be implemented");
    }

    /**
     * check Proximity of the npc with player.
     * This method must be implemented by subclasses.
     * @abstract
     */
    checkProximityToPlayer() {
        // To be implemented by subclasses
        throw new Error("Method 'jump()' must be implemented.");
    }

    /**
    * Create an explosion effect when the Enemy is destroyed.
    * @param {number} x - The x-coordinate of the explosion.
    * @param {number} y - The y-coordinate of the explosion.
    */
    explode(x,y) {
        const shards = 20; // Number of shards
        for (let i = 0; i < shards; i++) {
            const shard = document.createElement('div');
            shard.style.position = 'absolute';
            shard.style.width = '5px';
            shard.style.height = '5px';
            shard.style.backgroundColor = 'brown'; // Color of the shards
            shard.style.left =  `${x}px`;
            shard.style.top = `${this.gameEnv.top+y}px`;
            this.canvas.parentElement.appendChild(shard); // Add shard to the canvas

            const angle = Math.random() * 2 * Math.PI;
            const speed = Math.random() * 5 + 2;

            const shardX = Math.cos(angle) * speed;
            const shardY = Math.sin(angle) * speed;

            shard.animate(
                [
                    { transform: 'translate(0, 0)', opacity: 1 },
                    { transform: `translate(${shardX * 20}px, ${shardY * 20}px)`, opacity: 0 },
                ],
                {
                    duration: 1000,
                    easing: 'ease-out',
                    fill: 'forwards',
                }
            );

            setTimeout(() => {
                shard.remove(); // Remove shard after animation
            }, 1000);
        }
        //this.canvas.style.opacity = 0; // Make the Bat disappear
    }

    /**
     * jump the npc based on the collision.
     * This method must be implemented by subclasses.
     * @abstract
     */
    jump() {
        // To be implemented by subclasses
        throw new Error("Method 'jump()' must be implemented.");
    }
}

export default Enemy;