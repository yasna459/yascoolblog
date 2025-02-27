import GameObject from './GameObject.js';

/**
 * The Guide class represents a guide character in the game.
 * It extends the GameObject class and handles displaying facts to the player.
 * 
 * @class Guide
 * @extends GameObject
 */
class Guide extends GameObject {
    /**
     * Constructor for the Guide class.
     * 
     * @param {Object} data - The data for the guide, including sprite data and facts.
     */
    constructor(data) {
        super(data);
        this.facts = data.facts;
        this.currentFactIndex = 0;
        this.loadImage();
        this.initFactDisplay();
        this.handleNavigation();
    }

    /**
     * Loads the image for the guide.
     */
    loadImage() {
        this.image = new Image();
        this.image.src = 'images/gamify2/ratguide.png';
    }

    /**
     * Draws the guide on the canvas.
     */
    draw() {
        GameEnv.ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.pixels.width * this.SCALE_FACTOR,
            this.pixels.height * this.SCALE_FACTOR
        );
        this.displayFact();
    }

    /**
     * Updates the guide's state.
     */
    update() {
        // Guides are static, so no movement logic is needed
    }

    /**
     * Initializes the fact display element.
     */
    initFactDisplay() {
        const factElement = document.createElement('div');
        factElement.id = 'fact-display';
        factElement.style.position = 'fixed';
        factElement.style.bottom = '10px';
        factElement.style.left = '10px';
        factElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        factElement.style.color = 'white';
        factElement.style.padding = '10px';
        factElement.style.borderRadius = '5px';
        document.body.appendChild(factElement);
    }

    /**
     * Displays the current fact to the player.
     */
    displayFact() {
        const fact = this.facts[this.currentFactIndex];
        const factElement = document.getElementById('fact-display');
        if (factElement) {
            factElement.innerText = fact;
        }
    }

    /**
     * Handles navigation through the facts using arrow keys.
     */
    handleNavigation() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                this.nextFact();
            } else if (event.key === 'ArrowLeft') {
                this.previousFact();
            }
        });
    }

    /**
     * Displays the next fact.
     */
    nextFact() {
        if (this.currentFactIndex < this.facts.length - 1) {
            this.currentFactIndex++;
            this.displayFact();
        }
    }

    /**
     * Displays the previous fact.
     */
    previousFact() {
        if (this.currentFactIndex > 0) {
            this.currentFactIndex--;
            this.displayFact();
        }
    }

    /**
     * Resizes the guide based on the canvas size.
     */
    resize() {
        // Guides are static, so no resize logic is needed
    }

    /**
     * Removes the guide from the game environment.
     */
    destroy() {
        GameEnv.removeGameObject(this);
    }

    /**
     * Checks for collisions with other game objects.
     */
    collisionChecks() {
        // Implement collision detection logic if needed
    }

    /**
     * Detects collisions with other game objects.
     */
    isCollision() {
        // Implement collision detection logic if needed
    }
}

export default Guide;