import ancients from './assets/Ancients/index.js'
import cards from './assets/MythicCards/blue/index.js';
import ancientsData from './data/ancients.js'
import {
    brownCards,
    blueCards,
    greenCards
  } from './data/mythicCards/index.js'


const allMythicCards =  {
    brownCards,
    blueCards,
    greenCards
  };


  let ancient = '';
  let numbers = [];


// add ancients on the screen

function addAncients () {
    const ancientsDiv = document.querySelector('.ancients');
    ancientsData.forEach((e) => {
        const oneAncient = document.createElement("div");
        ancientsDiv.appendChild(oneAncient);
        oneAncient.classList.add("ancient-card");
        oneAncient.style.backgroundImage = "url("+e.cardFace+")";
        oneAncient.name = e.id;
    
    });

}

addAncients();


// add numbers to levels


function getAncientCard (ancientName) {
    let ancientCard = ancientsData.filter((e) => {
        if (e.id === ancientName) {
         return true;
        } else {return false};
     })
     return ancientCard;  
}



function getNumbers () {

    numbers = [];
    const stages = ['firstStage', 'secondStage', 'thirdStage'];
        
    let result = getAncientCard(ancient);
    
    stages.forEach((e) => {
        numbers.push(result[0][e].greenCards);
        numbers.push(result[0][e].brownCards);
        numbers.push(result[0][e].blueCards);
    });

        console.log(numbers);
    return numbers;
}

function addLevels () {

    let circles = [];
    for (let i = 0; i < 9; i++) {
         const circle = document.getElementById(`level_${i}`);
         circles.push(circle);
    };

    for (let i = 0; i < circles.length; i++) {
        circles[i].innerHTML = numbers[i];
    }
};
  

const ancientsDiv = document.querySelector('.ancients');

ancientsDiv.addEventListener('click', (e) => {
    const ancientCard = document.getElementsByClassName('ancient-card');
    for (let i = 0; i < ancientCard.length; i++) {
        console.log(ancientCard[i]);
        ancientCard[i].classList.remove('red-border');
    }
    ancient = e.target.name;
    numbers = getNumbers(ancient);
    addLevels();
    e.target.classList.add('red-border');
});





// Filter deck by difficulty

function filterCards (arr, difficultyType) {
    let newObj = arr.filter((e) => e.difficulty === difficultyType);
    return newObj;
}

// Get a Deck



function getDeck (level) {
    
    const numberOfCards = Object.keys(allMythicCards.brownCards);
    
    let cardsQty = numbers.reduce((a, b) => a + b, 0)
    

    let deck = {};

    if (level === 'medium') {
        deck = allMythicCards;
    }

    if (level === 'veryLight') {
        for (const property in allMythicCards) {
            deck[property] = filterCards(allMythicCards[property], 'easy');
        }
    }
    console.log(deck);
    return deck;
}

console.log(getDeck('veryLight'));

const difficulties = document.querySelector('.difficulties');
difficulties.addEventListener('click', (e)=> {
    getDeck(e.target.id);
    
    const difficultiesBtns = document.getElementsByClassName('difficulties-button');

    for (let i = 0; i < difficultiesBtns.length; i++) {
        console.log(difficultiesBtns[i]);
        difficultiesBtns[i].classList.remove('red-border');
    }
    e.target.classList.add('red-border');

})

// console.log(allMythicCards);
/*
let newObj = Object.keys(allMythicCards.brownCards) 
console.log(newObj);
*/





function splitDeck () {

}



// add deck after knead button clicked

const kneadBtn = document.querySelector('.knead');
const cardsGroup = document.querySelector('.cards');
const deck = document.querySelector('.deck');
const new_card = document.querySelector('.new_card');
const levels = document.querySelector('.levels');

kneadBtn.addEventListener('click', () => {
    cardsGroup.classList.add('cards1');
    deck.classList.add('deck1');
    new_card.classList.add('new_card1');
    levels.classList.remove('levels');
    kneadBtn.classList.add('remove-knead');
})