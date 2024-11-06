// Initial balance
let balance = 100;
let attempts = 0;
let correctButton;
const gameCost = 20; // Cost to start the game

// Update balance display
function updateBalance() {
    document.getElementById('balance').innerText = balance;
}

// Function to display a message on the page
function displayMessage(message) {
    document.getElementById('message').innerText = message;
}

// Start game function
function startGame() {
    if (balance < gameCost) {
        displayMessage("Not enough balance to start the game. You need at least $20.");
        return; // Exit if the balance is insufficient
    }

    const startConfirmed = confirm(`The game costs $${gameCost}. Do you want to spend it to start?`);

    if (!startConfirmed) {
        displayMessage("Game not started.");
        return; // Exit if the player cancels
    }

    balance -= gameCost; // Deduct the cost from balance
    updateBalance(); // Update balance display
    displayMessage("Game started!"); // Display initial message
    attempts = 0; // Reset attempts
    correctButton = Math.floor(Math.random() * 5) + 1; // Randomly choose correct button (1 to 5)
    
    document.getElementById('inputSection').style.display = 'block'; // Show input section
    document.getElementById('startBtn').style.display = 'none'; // Hide start button during the game
}

// Function to handle player's guess
function makeGuess() {
    const guessInput = document.getElementById('guessInput').value;
    const buttonIndex = parseInt(guessInput, 10); // Convert input to a number
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
            resetGame(); // Reset game after 3 attempts
        } else {
            displayMessage('Wrong! Try again.');
        }
    }
    
    updateBalance(); // Update balance display
}

// Function to reset the game after win or loss
function resetGame() {
    document.getElementById('inputSection').style.display = 'none'; // Hide input section
    document.getElementById('startBtn').style.display = 'block'; // Show start button again
    const playAgain = confirm("Do you want to play again?");
    if (playAgain) {
        updateBalance(); // Update balance display
        displayMessage(""); // Clear message after game resets
    } else {
        displayMessage("Thanks for playing!");
    }
}

// Add event listeners
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('guessBtn').addEventListener('click', makeGuess);
