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

const cardData = [
    {
        question: 'Capitol city of Canada',
        answer: 'Ottawa',
    },
    {
        question: 'T/F: sky == blue',
        answer: 'True',
    },
    {
        question: 'T/F: School is a waste of time and money',
        answer: 'True',
    },
    {
        question: 'What is needed to live a free life?',
        answer: 'Nothing',
    },
];

// Create all card DOM elements
const createCards = () => {
    cardData.forEach((data, index) => createCard(data, index));
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
