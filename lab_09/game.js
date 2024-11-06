const cardImages = [
    'assets/card1.png', 'assets/card2.png', 'assets/card3.png',
    'assets/card4.png', 'assets/card5.png', 'assets/card6.png',
    'assets/card7.png', 'assets/card8.png', 'assets/card9.png',
    'assets/card10.png', 'assets/card11.png', 'assets/card12.png'
];

const cards = [...cardImages, ...cardImages]; // 12 пар карток
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let attempts = 0;

const gameBoard = document.getElementById('game-board');
const attemptsDisplay = document.getElementById('attempts');

// Перемішати картки
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Створити картки
function createCards() {
    const shuffledCards = shuffle(cards);
    shuffledCards.forEach((cardImage, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-image', cardImage);
        card.style.backgroundColor = 'lightgray'; // Колір для картки
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        console.log(`Card ${index + 1} created with image: ${cardImage}`); // Виведення для перевірки
    });
}

// Відкрити картку
function flipCard() {
    if (lockBoard || this === firstCard) return;

    const image = this.getAttribute('data-image');
    console.log(`Flipping card with image: ${image}`); // Виведення для перевірки

    this.style.backgroundImage = `url(${image})`;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

// Перевірити на співпадіння
function checkForMatch() {
    const isMatch = firstCard.getAttribute('data-image') === secondCard.getAttribute('data-image');
    console.log(`Matching ${firstCard.getAttribute('data-image')} with ${secondCard.getAttribute('data-image')}`);

    if (isMatch) {
        resetCards();
    } else {
        attempts++;
        attemptsDisplay.textContent = attempts;
        setTimeout(() => {
            firstCard.style.backgroundImage = '';
            firstCard.classList.remove('flipped');
            secondCard.style.backgroundImage = '';
            secondCard.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
}

// Скинути картки
function resetCards() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Запустити гру
createCards();
