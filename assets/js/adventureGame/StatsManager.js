import { javaURI, fetchOptions } from "../api/config.js";

/**
 * Fetches and updates the game stats UI (Balance, Chat Score, Questions Answered).
 */
export function getStats() {
    const personId = 1;
    const endpoints = {
        balance: `${javaURI}/rpg_answer/getBalance/${personId}`,
        chatScore: `${javaURI}/rpg_answer/getChatScore/${personId}`,
        questionsAnswered: `${javaURI}/rpg_answer/getQuestionsAnswered/${personId}`
    };

    for (let [key, url] of Object.entries(endpoints)) {
        fetch(url, fetchOptions)
            .then(response => response.json())
            .then(data => {
                document.getElementById(key).innerText = data ?? 0;
            })
            .catch(err => console.error(`Error fetching ${key}:`, err));
    }
}

/**
 * Fetches the player's current balance.
 */
export function getBalance() {
    fetch(`${javaURI}/rpg_answer/getBalance/1`, fetchOptions)
        .then(response => response.json())
        .then(data => {
            document.getElementById("balance").innerText = data ?? 0;
        })
        .catch(err => console.error("Error fetching balance:", err));
}

/**
 * Fetches the player's current chat score.
 */
export function getChatScore() {
    fetch(`${javaURI}/rpg_answer/getChatScore/1`, fetchOptions)
        .then(response => response.json())
        .then(data => {
            document.getElementById("chatScore").innerText = data ?? 0;
        })
        .catch(err => console.error("Error fetching chat score:", err));
}

/**
 * Fetches the number of questions answered by the player.
 */
export function getQuestionsAnswered() {
    fetch(`${javaURI}/rpg_answer/getQuestionsAnswered/1`, fetchOptions)
        .then(response => response.json())
        .then(data => {
            document.getElementById("questionsAnswered").innerText = data ?? 0;
        })
        .catch(err => console.error("Error fetching questions answered:", err));
}

/**
 * Updates the player's balance.
 * 
 * @param {number} amount - The amount to update the balance by.
 */
export function updateBalance(amount) {
    fetch(`${javaURI}/rpg_answer/updateBalance/1`, {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify({ amount })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("balance").innerText = data ?? 0;
    })
    .catch(err => console.error("Error updating balance:", err));
}

/**
 * Updates the player's chat score.
 * 
 * @param {number} score - The score to update the chat score by.
 */
export function updateChatScore(score) {
    fetch(`${javaURI}/rpg_answer/updateChatScore/1`, {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify({ score })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("chatScore").innerText = data ?? 0;
    })
    .catch(err => console.error("Error updating chat score:", err));
}

/**
 * Updates the number of questions answered by the player.
 * 
 * @param {number} count - The number of questions answered to update.
 */
export function updateQuestionsAnswered(count) {
    fetch(`${javaURI}/rpg_answer/updateQuestionsAnswered/1`, {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify({ count })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("questionsAnswered").innerText = data ?? 0;
    })
    .catch(err => console.error("Error updating questions answered:", err));
}

/**
 * Updates all stats (balance, chat score, questions answered).
 */
export function updateStats() {
    getBalance();
    getChatScore();
    getQuestionsAnswered();
}