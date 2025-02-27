import Character from './Character.js';

/**
 * The Guard class represents a guard in the game.
 * Guards are fixed characters that ask questions to the player.
 * 
 * @class Guard
 * @extends Character
 */
class Guard extends Character {
    /**
     * Constructor for the Guard class.
     * 
     * @param {Object} data - The data for the guard, including sprite data and quiz questions.
     */
    constructor(data) {
        if (!data || !data.guardType) {
            throw new Error("Unknown guard type: " + data?.guardType);
        }
        super(data);
        this.quiz = data.quiz;
        this.correctAnswers = 0;
        this.askedQuestions = 0;
        this.maxQuestions = 5;
        this.guardType = data.guardType; // 'pyramid', 'tomb', 'soldier', 'chimney_sweeper'
        this.loadImage();
    }

    /**
     * Loads the guard image based on the guard type.
     */
    loadImage() {
        this.image = new Image();
        switch (this.guardType) {
            case 'pyramid':
                this.image.src = 'images/gamify2/pyramidguard.png';
                break;
            case 'tomb':
                this.image.src = 'images/gamify2/tombguard.png';
                break;
            case 'soldier':
                this.image.src = 'images/gamify2/soldier.png';
                break;
            case 'chimney_sweeper':
                this.image.src = 'images/gamify2/chimneysweeper.png';
                break;
            default:
                throw new Error("Unknown guard type: " + this.guardType);
        }
    }

    /**
     * Draws the guard on the canvas.
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
     * Updates the guard's state.
     */
    update() {
        // Guards are static, so no movement logic is needed
    }

    /**
     * Asks a question to the player.
     */
    askQuestion() {
        if (this.askedQuestions < this.maxQuestions) {
            const question = this.quiz.questions[this.askedQuestions];
            const answer = prompt(question);
            this.checkAnswer(answer);
        } else {
            this.evaluatePerformance();
        }
    }

    /**
     * Checks the player's answer to the current question.
     * 
     * @param {string} answer - The player's answer.
     */
    checkAnswer(answer) {
        const correctAnswer = this.getCorrectAnswer(this.askedQuestions);
        if (answer == correctAnswer) {
            this.correctAnswers++;
        }
        this.askedQuestions++;
        this.askQuestion();
    }

    /**
     * Gets the correct answer for the current question.
     * 
     * @param {number} index - The index of the current question.
     * @returns {string} - The correct answer.
     */
    getCorrectAnswer(index) {
        // Assuming the correct answer is always the first option for simplicity
        return this.quiz.questions[index].split('\n')[1].split('. ')[1];
    }

    /**
     * Evaluates the player's performance after answering all questions.
     */
    evaluatePerformance() {
        if (this.correctAnswers >= 9) {
            alert("You answered 9 or more questions correctly. The chase begins!");
            GameControl.startChase();
        } else {
            alert("You answered less than 9 questions correctly. Try again.");
            this.askedQuestions = 0;
            this.correctAnswers = 0;
            this.askQuestion();
        }
    }

    /**
     * Resizes the guard based on the canvas size.
     */
    resize() {
        // Guards are static, so no resize logic is needed
    }

    /**
     * Removes the guard from the game environment.
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

export default Guard;