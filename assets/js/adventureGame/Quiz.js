import gameControlInstance from "./GameControl.js";

class Quiz {
    constructor() {
        this.isOpen = false;
        this.dim = false;
        this.currentNpc = null;
        this.currentPage = 0;
        this.userAnswers = [];
        this.injectStyles(); // Inject CSS styles dynamically
    }

    // Inject CSS styles directly into the document
    injectStyles() {
        const style = document.createElement("style");
        style.innerHTML = `
            /* Egyptian themed font */
            @import url('https://fonts.googleapis.com/css2?family=Papyrus&display=swap');

            /* Background dimming */
            #dim {
                background-color: rgba(0, 0, 0, 0.8);
                width: 100%;
                height: 100%;
                position: fixed;
                top: 0;
                left: 0;
                z-index: 9998;
            }

            /* Quiz popup styling */
            .quiz-popup {
                position: fixed;
                width: 80%;
                max-width: 800px;
                top: 10%;
                left: 50%;
                transform: translateX(-50%);
                z-index: 9999;
                max-height: 80vh;
                overflow-y: auto;
                background-color: #f5deb3; /* Wheat color */
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                font-family: 'Papyrus', sans-serif;
                border: 2px solid #8b4513; /* SaddleBrown color */
                color: #8b4513; /* SaddleBrown color */
            }

            /* Quiz title styling */
            .quiz-popup h2 {
                color: #8b4513; /* SaddleBrown color */
                text-align: center;
            }

            /* Question styling */
            .quiz-popup p {
                color: #8b4513; /* SaddleBrown color */
            }

            /* Option styling */
            .quiz-popup label {
                display: block;
                margin-bottom: 10px;
                color: #8b4513; /* SaddleBrown color */
            }

            /* Input field styling */
            .quiz-input {
                width: 95%;
                padding: 8px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                background: #faf2d0;
                border-radius: 5px;
                font-size: 16px;
                margin-top: 5px;
                font-family: 'Papyrus', sans-serif;
                transition: all 0.2s ease-in-out;
            }
            .quiz-input:focus {
                outline: none;
                border: 2px solid #8b4513;
                box-shadow: 0 0 8px rgba(139, 69, 19, 0.6);
                background: #fff8d0;
            }

            /* Submit button styling */
            .quiz-submit {
                background-color: #8b4513; /* SaddleBrown color */
                color: #ffffff;
                border: none;
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                border-radius: 5px;
                margin-top: 20px;
                transition: 0.3s ease-in-out;
            }

            .quiz-submit:hover {
                background-color: #a0522d; /* Sienna color */
            }

            /* Close button styling */
            .close-button {
                background-color: #b22222; /* FireBrick color */
                margin-left: 10px;
            }

            .close-button:hover {
                background-color: #cd5c5c; /* IndianRed color */
            }

            /* Score sheet styling */
            .score-sheet {
                background-color: #f5deb3; /* Wheat color */
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                font-family: 'Papyrus', sans-serif;
                border: 2px solid #8b4513; /* SaddleBrown color */
                color: #8b4513; /* SaddleBrown color */
                text-align: center;
                margin-top: 20px;
            }
        `;
        document.head.appendChild(style);
    }

    backgroundDim = {
        create: () => {
            this.dim = true;
            const dimDiv = document.createElement("div");
            dimDiv.id = "dim";
            document.body.append(dimDiv);
            dimDiv.addEventListener("click", this.backgroundDim.remove);
        },

        remove: () => {
            this.dim = false;
            const dimDiv = document.getElementById("dim");
            if (dimDiv) {
                dimDiv.remove();
            }
            this.isOpen = false;
            const quizPopup = document.querySelector(".quiz-popup");
            if (quizPopup) {
                quizPopup.remove();
            }
        }
    };

    initialize() {
        if (!this.isOpen) {
            this.backgroundDim.create();
            this.isOpen = true;
        }
    }

    openPanel(quizData) {
        const quizPopup = document.createElement("div");
        quizPopup.className = "quiz-popup";

        const title = document.createElement("h2");
        title.innerText = quizData.title;
        quizPopup.appendChild(title);

        quizData.questions.forEach((questionData, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.style.marginBottom = "15px";

            const questionText = document.createElement("p");
            questionText.innerText = `${index + 1}. ${questionData.question}`;
            questionDiv.appendChild(questionText);

            questionData.options.forEach((option, optionIndex) => {
                const optionLabel = document.createElement("label");

                const optionInput = document.createElement("input");
                optionInput.type = "radio";
                optionInput.name = `question${index}`;
                optionInput.value = optionIndex;

                optionLabel.appendChild(optionInput);
                optionLabel.appendChild(document.createTextNode(option));
                questionDiv.appendChild(optionLabel);
            });

            quizPopup.appendChild(questionDiv);
        });

        const submitButton = document.createElement("button");
        submitButton.innerText = "Submit";
        submitButton.className = "quiz-submit";
        submitButton.addEventListener("click", () => this.handleSubmit(quizData));
        quizPopup.appendChild(submitButton);

        const closeButton = document.createElement("button");
        closeButton.innerText = "Close";
        closeButton.className = "close-button";
        closeButton.addEventListener("click", this.backgroundDim.remove);
        quizPopup.appendChild(closeButton);

        document.body.appendChild(quizPopup);
    }

    handleSubmit(quizData) {
        const quizPopup = document.querySelector(".quiz-popup");
        const userAnswers = [];
        let correctAnswers = 0;

        quizData.questions.forEach((questionData, index) => {
            const selectedOption = quizPopup.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption) {
                userAnswers.push(parseInt(selectedOption.value));
                if (parseInt(selectedOption.value) === questionData.correctAnswer) {
                    correctAnswers++;
                }
            } else {
                userAnswers.push(null); // No answer selected
            }
        });

        console.log("User Answers:", userAnswers);
        this.userAnswers = userAnswers;
        this.backgroundDim.remove();
        this.showScoreSheet(correctAnswers, quizData.questions.length);
    }

    showScoreSheet(correctAnswers, totalQuestions) {
        const scoreSheet = document.createElement("div");
        scoreSheet.className = "score-sheet";
        scoreSheet.innerHTML = `
            <h2>Score Sheet</h2>
            <p>You got ${correctAnswers} out of ${totalQuestions} questions right!</p>
        `;

        const closeButton = document.createElement("button");
        closeButton.innerText = "Close";
        closeButton.className = "close-button";
        closeButton.addEventListener("click", () => {
            scoreSheet.remove();
            this.backgroundDim.remove();
        });
        scoreSheet.appendChild(closeButton);

        document.body.appendChild(scoreSheet);
    }
}

export default Quiz;