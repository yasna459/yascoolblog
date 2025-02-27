import GameEnv from './GameEnv.js';
import GameLevelAncientEgypt from './GameLevelAncientEgypt.js';
import GameLevelVictorianEra from './GameLevelVictorianEra.js';
import { getStats, updateStats } from "./StatsManager.js";
import Prompt from './Prompt.js';

const createStatsUI = () => {
    const statsContainer = document.createElement('div');
    statsContainer.id = 'stats-container';
    statsContainer.style.position = 'fixed';
    statsContainer.style.top = '10px';
    statsContainer.style.right = '10px';
    statsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    statsContainer.style.color = 'white';
    statsContainer.style.padding = '10px';
    statsContainer.style.borderRadius = '5px';
    statsContainer.innerHTML = `
        <div>Balance: <span id="balance">0</span></div>
        <div>Chat Score: <span id="chatScore">0</span></div>
        <div>Questions Answered: <span id="questionsAnswered">0</span></div>
        <div>High Score: <span id="highScore">0</span></div>
        <div>Time Elapsed: <span id="timeElapsed">0</span></div>
    `;
    document.body.appendChild(statsContainer);
};

const updateStatsUI = () => {
    const stats = getStats();
    document.getElementById('balance').innerText = stats.balance;
    document.getElementById('chatScore').innerText = stats.chatScore;
    document.getElementById('questionsAnswered').innerText = stats.questionsAnswered;
    document.getElementById('highScore').innerText = stats.highScore;
    document.getElementById('timeElapsed').innerText = stats.timeElapsed;
};

const createHintButton = () => {
    const hintButton = document.createElement('button');
    hintButton.id = 'hint-button';
    hintButton.innerText = 'Hint';
    hintButton.style.position = 'fixed';
    hintButton.style.bottom = '10px';
    hintButton.style.right = '10px';
    hintButton.style.padding = '10px';
    hintButton.style.borderRadius = '5px';
    hintButton.addEventListener('click', () => {
        Prompt.showHint();
    });
    document.body.appendChild(hintButton);
};

const createTranscriptButton = () => {
    const transcriptButton = document.createElement('button');
    transcriptButton.id = 'transcript-button';
    transcriptButton.innerText = 'Transcript';
    transcriptButton.style.position = 'fixed';
    transcriptButton.style.bottom = '10px';
    transcriptButton.style.right = '80px';
    transcriptButton.style.padding = '10px';
    transcriptButton.style.borderRadius = '5px';
    transcriptButton.addEventListener('click', () => {
        Prompt.showTranscript();
    });
    document.body.appendChild(transcriptButton);
};

/**
 * The GameControl object manages the game.
 * 
 * This code uses the JavaScript "object literal pattern" which is nice for centralizing control logic.
 * 
 * The object literal pattern is a simple way to create singleton objects in JavaScript.
 * It allows for easy grouping of related functions and properties, making the code more organized and readable.
 * In the context of GameControl, this pattern helps centralize the game's control logic, 
 * making it easier to manage game states, handle events, and maintain the overall flow of the game.
 * 
 * @type {Object}
 * @property {Player} player - The player object.
 * @property {function} start - Initialize game assets and start the game loop.
 * @property {function} gameLoop - The game loop.
 * @property {function} resize - Resize the canvas and player object when the window is resized.
 */
const GameControl = {
    intervalID: null, // Variable to hold the timer interval reference
    startTime: null, // Variable to hold the start time of the game
    localStorageTimeKey: "localTimes",
    currentPass: 0,
    currentLevelIndex: 0,
    levelClasses: [],
    path: '',
    questionsAnsweredCorrectly: 0,
    maxQuestions: 10,
    requiredCorrectAnswers: 9,

    start(path) {
        GameEnv.create();
        this.levelClasses = [GameLevelAncientEgypt, GameLevelVictorianEra];
        this.currentLevelIndex = 0;
        this.path = path;
        this.addExitKeyListener();
        this.loadLevel();
        createStatsUI();
        createHintButton();
        createTranscriptButton();
        this.startTime = Date.now();
        this.intervalID = setInterval(this.updateTimeElapsed.bind(this), 1000); // Update time elapsed every second
    },
    
    loadLevel() {
        if (this.currentLevelIndex >= this.levelClasses.length) {
            this.stopTimer();
            return;
        }
        GameEnv.continueLevel = true;
        GameEnv.gameObjects = [];
        this.currentPass = 0;
        this.questionsAnsweredCorrectly = 0;
        const LevelClass = this.levelClasses[this.currentLevelIndex];
        const levelInstance = new LevelClass(this.path);
        this.loadLevelObjects(levelInstance);
    },
    
    loadLevelObjects(gameInstance) {
        this.initStatsUI();
        // Instantiate the game objects
        for (let object of gameInstance.objects) {
            if (!object.data) object.data = {};
            new object.class(object.data);
        }
        // Start the game loop
        this.gameLoop();
        getStats();
    },

    gameLoop() {
        // Base case: leave the game loop 
        if (!GameEnv.continueLevel) {
            this.handleLevelEnd();
            return;
        }
        // Nominal case: update the game objects 
        GameEnv.clear();
        for (let object of GameEnv.gameObjects) {
            object.update();  // Update the game objects
        }
        this.handleLevelStart();
        // Recursively call this function at animation frame rate
        requestAnimationFrame(this.gameLoop.bind(this));
    },

    handleLevelStart() {
        // First time message for level 0, delay 10 passes
        if (this.currentLevelIndex === 0 && this.currentPass === 10) {
            alert("Start Level.");
        }
        // Recursion tracker
        this.currentPass++;
    },

    handleLevelEnd() {
        // More levels to play 
        if (this.currentLevelIndex < this.levelClasses.length - 1) {
            alert("Level ended.");
        } else { // All levels completed
            alert("Game over. All levels completed.");
        }
        // Tear down the game environment
        for (let index = GameEnv.gameObjects.length - 1; index >= 0; index--) {
            GameEnv.gameObjects[index].destroy();
        }
        // Move to the next level
        this.currentLevelIndex++;
        // Go back to the loadLevel function
        this.loadLevel();
    },
    
    resize() {
        // Resize the game environment
        GameEnv.resize();
        // Resize the game objects
        for (let object of GameEnv.gameObjects) {
            object.resize(); // Resize the game objects
        }
    },

    addExitKeyListener() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                GameEnv.continueLevel = false;
            }
        });
    },

    /**
     * Updates and displays the game timer.
     * @function updateTimer
     * @memberof GameControl
     */ 
    saveTime(time, score) {
        if (time == 0) return;
        const userID = GameEnv.userID
        const oldTable = this.getAllTimes()

        const data = {
            userID: userID,
            time: time,
            score: score
        }

        if (!oldTable) {
            localStorage.setItem(this.localStorageTimeKey, JSON.stringify([data]))
            return;
        }

        oldTable.push(data)

        localStorage.setItem(this.localStorageTimeKey, JSON.stringify(oldTable))
    },
    getAllTimes() {
        let timeTable = null;

        try {
            timeTable = localStorage.getItem(this.localStorageTimeKey);
        }
        catch (e) {
            return e;
        }

        return JSON.parse(timeTable)
    },
    updateTimer() {
        const time = GameEnv.time

        if (GameEnv.timerActive) {
            const newTime = time + GameEnv.timerInterval
            GameEnv.time = newTime                
            if (document.getElementById('timeScore')) {
                document.getElementById('timeScore').textContent = (time/1000).toFixed(2) 
            }
                return newTime
            }
            if (document.getElementById('timeScore')) {
                document.getElementById('timeScore').textContent = (time/1000).toFixed(2) 
            }
    },   
    /**
     * Starts the game timer.
     * @function startTimer
     * @memberof GameControl
     */
    startTimer() {
        if (GameEnv.timerActive) {
            console.warn("TIMER ACTIVE: TRUE, TIMER NOT STARTED")
            return;
        }
        
        this.intervalId = setInterval(() => this.updateTimer(), GameEnv.timerInterval);
        GameEnv.timerActive = true;
    },

    /**
     * Stops the game timer.
     * @function stopTimer
     * @memberof GameControl
     */
    stopTimer() {   
        if (!GameEnv.timerActive) return;
        
        this.saveTime(GameEnv.time, GameEnv.coinScore)

        GameEnv.timerActive = false
        GameEnv.time = 0;
        GameEnv.coinScore = 0;
        this.updateCoinDisplay()
        clearInterval(this.intervalID)
    },

    // Initialize UI for game stats
    initStatsUI: function() {
        const statsContainer = document.createElement('div');
        statsContainer.id = 'stats-container';
        statsContainer.style.position = 'fixed';
        statsContainer.style.top = '75px'; 
        statsContainer.style.right = '10px';
        statsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        statsContainer.style.color = 'white';
        statsContainer.style.padding = '10px';
        statsContainer.style.borderRadius = '5px';
        statsContainer.innerHTML = `
            <div>Balance: <span id="balance">0</span></div>
            <div>Chat Score: <span id="chatScore">0</span></div>
            <div>Questions Answered: <span id="questionsAnswered">0</span></div>
        `;
        document.body.appendChild(statsContainer);
    },

    updateTimeElapsed() {
        const currentTime = Date.now();
        const timeElapsed = Math.floor((currentTime - this.startTime) / 1000); // Time in seconds
        updateStats({ timeElapsed });
        updateStatsUI();
    },

    /**
     * Handles the quiz logic for the guards.
     * @param {Object} guard - The guard object.
     */
    handleGuardQuiz(guard) {
        const questions = guard.data.quiz.questions;
        let correctAnswers = 0;

        questions.forEach(question => {
            const answer = prompt(question);
            if (this.checkAnswer(question, answer)) {
                correctAnswers++;
            }
        });

        this.questionsAnsweredCorrectly += correctAnswers;

        if (this.questionsAnsweredCorrectly >= this.requiredCorrectAnswers) {
            this.startChase();
        } else {
            alert("You need to answer at least 9 out of 10 questions correctly. Try again.");
            this.handleGuardQuiz(guard);
        }
    },

    /**
     * Checks if the provided answer is correct.
     * @param {string} question - The question string.
     * @param {string} answer - The provided answer.
     * @returns {boolean} - True if the answer is correct, false otherwise.
     */
    checkAnswer(question, answer) {
        // Implement your answer checking logic here
        // For simplicity, let's assume the correct answer is always "1"
        return answer === "1";
    },

    /**
     * Starts the chase sequence.
     */
    startChase() {
        alert("The chase begins!");
        // Implement your chase logic here
    }
};

// Detect window resize events and call the resize function.
window.addEventListener('resize', GameControl.resize.bind(GameControl));

export default GameControl;