let balance = 100;
let attempts = 0;
let correctButton;
const gameCost = 20; 

function updateBalance() {
    document.getElementById('balance').innerText = balance;
}

function displayMessage(message) {
    document.getElementById('message').innerText = message;
}

function startGame() {
    if (balance < gameCost) {
        displayMessage("Not enough balance to start the game. You need at least $20.");
        return; 
    }

    const startConfirmed = confirm(`The game costs $${gameCost}. Do you want to spend it to start?`);

    if (!startConfirmed) {
        displayMessage("Game not started.");
        return; 
    }

    balance -= gameCost; 
    updateBalance(); 
    displayMessage("Game started!"); 
    attempts = 0; 
    correctButton = Math.floor(Math.random() * 5) + 1; 
    
    document.getElementById('inputSection').style.display = 'block';
    document.getElementById('startBtn').style.display = 'none'; 
}

// Function to handle player's guess
function makeGuess() {
    const guessInput = document.getElementById('guessInput').value;
    const buttonIndex = parseInt(guessInput, 10); 
    attempts++;
    
    if (buttonIndex === correctButton) {
        if (attempts === 1) {
            balance += 40;
            displayMessage('Correct! You win $40.');
        } else if (attempts === 2) {
            balance += 20;
            displayMessage('Correct! You win $20.');
        } else if (attempts === 3) {
            balance += 10;
            displayMessage('Correct! You win $10.');
        } else {
            displayMessage('Correct, but no reward after 3 attempts.');
        }
        resetGame();
    } else {
        if (attempts === 3) {
            displayMessage('Game over! No more attempts.');
            resetGame(); 
        } else {
            displayMessage('Wrong! Try again.');
        }
    }
    
    updateBalance(); 
}

function resetGame() {
    document.getElementById('inputSection').style.display = 'none'; 
    document.getElementById('startBtn').style.display = 'block'; 
    const playAgain = confirm("Do you want to play again?");
    if (playAgain) {
        updateBalance(); 
        displayMessage(""); 
    } else {
        displayMessage("Thanks for playing!");
    }
}

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('guessBtn').addEventListener('click', makeGuess);
