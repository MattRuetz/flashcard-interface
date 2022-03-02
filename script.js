const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep track of current
let currentActiveCard = 0;

// Store DOM elements
const cardsEl = [];

// Get saved cards from localStorage
const getCardsData = () => {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
};

const cardsData = getCardsData();

// Create all card DOM elements
const createCards = () => {
    cardsData.forEach((data, index) => createCard(data, index));
};

const setCardsData = (cards) => {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
};

// Create individual card DOM elements
const createCard = (data, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    index == 0 && card.classList.add('active');

    card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>${data.question}</p>
        </div>
        <div class="inner-card-back">
            <p>${data.answer}</p>
        </div>
    </div>
    `;
    // Each card has this event listener attached
    card.addEventListener('click', () => card.classList.toggle('show-answer'));

    // Push to array of cards and append to DOM
    cardsEl.push(card);
    cardsContainer.appendChild(card);
    updateCurrentText();
};

// Show number of cards and index of current
const updateCurrentText = () => {
    currentEl.textContent = `${currentActiveCard + 1}/${cardsEl.length}`;
};

createCards();

// ------------ Event Listeners ------------
// Nav to next, no overflow allowed
nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';

    currentActiveCard < cardsEl.length - 1 && currentActiveCard++;

    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentText();
});
// Nav to prev, no overflow
prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';

    currentActiveCard > 0 && currentActiveCard--;

    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentText();
});

// Show ADD container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));
// Hide ADD container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Add new card
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;

    if (question.trim() && answer.trim()) {
        const newCard = { question, answer };

        createCard(newCard);

        questionEl.value = '';
        answerEl.value = '';

        addContainer.classList.remove('show');
        cardsData.push(newCard);

        setCardsData(cardsData);
    }
});

// Clear Cards Btn
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});
