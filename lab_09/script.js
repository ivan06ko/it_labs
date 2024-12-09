const board = document.getElementById('game-board');
const attemptsDisplay = document.getElementById('attempts');

// Можливі значення для карток (лише 8 пар)
const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

let shuffledValues = shuffle(cardValues);
let flippedCards = [];
let matchedCards = [];
let attempts = 0;

// Створюємо картки
shuffledValues.forEach(value => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.value = value;
  card.textContent = value;
  card.addEventListener('click', flipCard);
  board.appendChild(card);
});

// Перемішуємо масив
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Перевертання картки
function flipCard() {
  if (this.classList.contains('flipped') || this.classList.contains('matched')) return;
  if (flippedCards.length === 2) return;

  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) checkForMatch();
}

// Перевірка на збіг
function checkForMatch() {
  attempts++;
  attemptsDisplay.textContent = `Спроби: ${attempts}`;

  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
    flippedCards = [];
    checkGameOver();
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

// Перевірка завершення гри
function checkGameOver() {
  if (matchedCards.length === cardValues.length) {
    setTimeout(() => alert('Вітаємо! Ви напевно закінчили гру!'), 500);
  }
}