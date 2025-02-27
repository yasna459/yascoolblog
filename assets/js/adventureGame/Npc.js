import Character from './Character.js';
import Prompt from "./Prompt.js";

/**
 * The Npc class represents a non-player character in the game.
 * It extends the Character class and handles quiz interactions with the player.
 * 
 * @class Npc
 * @extends Character
 */
class Npc extends Character {
    /**
     * Constructor for the Npc class.
     * 
     * @param {Object} data - The data for the NPC, including quiz questions.
     */
    constructor(data = null) {
        super(data);
        this.quiz = data?.quiz?.title; // Quiz title
        this.questions = Prompt.shuffleArray(data?.quiz?.questions || []); // Shuffle questions
        this.currentQuestionIndex = 0; // Start from the first question
        this.alertTimeout = null;
        this.bindEventListeners();
    }

    /**
     * Override the update method to draw the NPC.
     * This NPC is stationary, so the update method only calls the draw method.
     */
    update() {
        this.draw();
    }

    /**
     * Bind key event listeners for proximity interaction.
     */
    bindEventListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    /**
     * Handle keydown events for interaction.
     * @param {Object} event - The keydown event.
     */
    handleKeyDown({ key }) {
        switch (key) {
            case 'e': // Player 1 interaction
            case 'u': // Player 2 interaction
                this.shareQuizQuestion();
                break;
        }
    }

    /**
     * Handle keyup events to stop player actions.
     * @param {Object} event - The keyup event.
     */
    handleKeyUp({ key }) {
        if (key === 'e' || key === 'u') {
            clearTimeout(this.alertTimeout);
        }
    }

    /**
     * Shares a quiz question with the player.
     */
    shareQuizQuestion() {
        if (this.currentQuestionIndex < this.questions.length) {
            const question = this.questions[this.currentQuestionIndex];
            alert(question);
            this.currentQuestionIndex++;
        } else {
            alert("You have answered all the questions!");
        }
    }

    /**
     * Resizes the NPC based on the canvas size.
     */
    resize() {
        // NPCs are static, so no resize logic is needed
    }

    /**
     * Removes the NPC from the game environment.
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

export default Npc;