import GameObject from './GameObject.js';
import Prompt from './Prompt.js';

/**
 * The Trivia class represents a trivia game in the game.
 * It extends the GameObject class and handles displaying trivia questions to the player.
 * 
 * @class Trivia
 * @extends GameObject
 */
class Trivia extends GameObject {
    /**
     * Constructor for the Trivia class.
     * 
     * @param {Object} data - The data for the trivia, including questions and answers.
     */
    constructor(data) {
        super(data);
        this.questions = data.questions;
        this.correctAnswers = 0;
        this.askedQuestions = 0;
        this.maxQuestions = data.maxQuestions || 5;
        this.loadImage();
    }

    /**
     * Loads the trivia image.
     */
    loadImage() {
        this.image = new Image();
        this.image.src = 'images/gamify2/trivia.jpeg';
    }

    /**
     * Draws the trivia on the canvas.
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
     * Updates the trivia's state.
     */
    update() {
        // Trivia is static, so no movement logic is needed
    }

    /**
     * Asks a question to the player.
     */
    askQuestion() {
        Prompt.showPrompt(this);
    }

    /**
     * Checks the player's answers to the questions.
     * 
     * @param {Array<string>} answers - The player's answers.
     */
    checkAnswers(answers) {
        answers.forEach((answer, index) => {
            const correctAnswer = this.getCorrectAnswer(index);
            if (answer == correctAnswer) {
                this.correctAnswers++;
            }
        });
        this.evaluatePerformance();
    }

    /**
     * Gets the correct answer for the current question.
     * 
     * @param {number} index - The index of the current question.
     * @returns {string} - The correct answer.
     */
    getCorrectAnswer(index) {
        // Assuming the correct answer is always the first option for simplicity
        return this.questions[index].split('\n')[1].split('. ')[1];
    }

    /**
     * Evaluates the player's performance after answering all questions.
     */
    evaluatePerformance() {
        if (this.correctAnswers >= this.maxQuestions) {
            alert("You answered enough questions correctly. Well done!");
            // Implement any additional logic for successful completion
        } else {
            alert("You didn't answer enough questions correctly. Try again.");
            this.askedQuestions = 0;
            this.correctAnswers = 0;
            this.askQuestion();
        }
    }

    /**
     * Resizes the trivia based on the canvas size.
     */
    resize() {
        // Trivia is static, so no resize logic is needed
    }

    /**
     * Removes the trivia from the game environment.
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

export default Trivia;