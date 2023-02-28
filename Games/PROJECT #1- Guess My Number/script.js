'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const message = document.querySelector('.message');
const displayMessage = function (gameMessage) {
    message.textContent = gameMessage;
};

const guessedNumber = document.querySelector('.guess');
const number = document.querySelector('.number');
const currNumber = function (newNumber) {
    number.textContent = newNumber;
};

const gameScore = document.querySelector('.score');

document.querySelector('.check').addEventListener ('click', function() {
    const guess = Number(guessedNumber.value);

    // When there is no input
    if (!guess) {
        displayMessage('🛑 No Number Entered');
    }
    
    // When players wins the game
    else if (guess == secretNumber) {
        displayMessage('🎉 Correct Number...');
        currNumber(secretNumber);
        document.body.style.backgroundColor = '#60b347';
        if (score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }
    } 

    // When Guess is Wrong
    else if (guess !== secretNumber) {
        if (score > 1) {
            displayMessage( guess > secretNumber ? "📈 Too High!!" : "📉 Too Low!!");
            score--;
            gameScore.textContent = score;
        } 

        // When Player looses the game
        else {
            displayMessage('You Lost 😂');
            document.body.style.backgroundColor = "orangered";
            number.textContent = secretNumber;
            gameScore.textContent = 0;
        }
    }
});


// Resetting the game

document.querySelector('.again').addEventListener('click', function () {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    displayMessage('Start guessing...');
    gameScore.textContent = score;
    document.body.style.backgroundColor = '#222';
    currNumber('?');
    guessedNumber.value = '';
});


// Reloading the game
document.querySelector('.reset').addEventListener('click', function () {
    location.reload();
});
