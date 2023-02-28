'use strict';

// Selecting Elements
const score0El = document.getElementById('score--0');
const current0El = document.getElementById('current--0');
const score1El = document.getElementById('score--1');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');


let scores, currentScore, activePlayer, playing;

// Starting Conditions
const init = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}

init();

// Function to update score and switch player
const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener ('click' , function () {
    if(playing) {
        // Generate a random no. b/w 1 to 6
        const dice = Math.trunc(Math.random() * 6) + 1;

        // Display Dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        
        // Add the current score
        if (dice !== 1) {
            currentScore += dice;  // currentScore = currentScore + dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            

        } else {
            // Switch player on getting 1
            switchPlayer();
        }
    }
});

// Holding the value
btnHold.addEventListener('click', function(){
    if(playing) {
        // Add the current score to player score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        
        // Check if player has won 
        if(scores[activePlayer] >= 100){
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            btnRoll.style.display = 'none';
            btnHold.style.display = 'none';
            diceEl.classList.add('hidden');
        }else {
            // Switch player when its holds the score
            switchPlayer();
        }
    }
});

// Resetting the Game
/* 
btnNewGame.addEventListener('click', init);
*/

btnNewGame.addEventListener('click', function(){
    location.reload();
}); 
