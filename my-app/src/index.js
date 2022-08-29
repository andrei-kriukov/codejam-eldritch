import ancients from './assets/Ancients/index.js'
import cards from './assets/MythicCards/blue/index.js';
import ancientsData from './data/ancients.js'
import {
    brownCards,
    blueCards,
    greenCards
  } from './data/mythicCards/index.js'

console.log("Я не выполнил задание, но смог получить несколько промежуточных результатов")
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


// get random card

function getRandom(num) {
    return Math.floor(Math.random() * num);
  };

function getRandomCard (arr, qty) {
    let set = new Set();
    for (let i = 0; Array.from(set).length < qty; i++) {
        set.add(arr[getRandom(arr.length)]);
    }
    
    return Array.from(set);
};

// Get a Deck


function getDeck (level) {
    
   // const numberOfCards = Object.keys(allMythicCards.brownCards);
    
   // let cardsQty = numbers.reduce((a, b) => a + b, 0)
    
    let green = numbers[0] + numbers[3] + numbers[6];
    let brown = numbers[1] + numbers[4] + numbers[7];
    let blue = numbers[2] + numbers[5] + numbers[8];
    console.log(`- получить количество карт в зависимости от старейшего\ngreen ${green}, brown ${brown}, blue ${blue}`)

    let deck = {};

    if (level === 'medium') {
        
       for  (let property in allMythicCards) {
            let qty = 0;

            if (property === 'greenCards') {qty = green}
            else if (property === 'brownCards') {qty = brown}
            else {qty = blue};
    
            deck[property] = getRandomCard(allMythicCards[property], qty)
           } 
    };


    if (level === 'veryLight') {
        for (const property in allMythicCards) {
            deck[property] = filterCards(allMythicCards[property], 'easy');
        }
    }
    return deck;
}

// set deck

const difficulties = document.querySelector('.difficulties');
difficulties.addEventListener('click', (e)=> {
        
    const difficultiesBtns = document.getElementsByClassName('difficulties-button');

    for (let i = 0; i < difficultiesBtns.length; i++) {
        difficultiesBtns[i].classList.remove('red-border');
    }
    e.target.classList.add('red-border');

    splitDeck(e.target.id);

})

console.log("А если нажать на среднюю сложность, то")



function splitDeck (level) {

    let firstStage = [];
    let secondStage = [];
    let thirdStage = [];
    let splitedDeck = [firstStage, secondStage, thirdStage];

    let deck = getDeck(level);
    

    const colors = [deck.greenCards, deck.brownCards, deck.blueCards]

    numbers.forEach((n, ind) => {
        
        for (let i = 0; i < n; i++) {
            if (Math.trunc(ind / 3) === 0) {
                let element = colors[ind].pop();
                console.log(element);
                firstStage.push(element);
            }
            else if (Math.trunc(ind / 3) === 1) {
                let element = colors[ind -3].pop();
                secondStage.push(element);
            }
            else {
                let element = colors[ind - 6].pop();
                thirdStage.push(element);
            }
        }
        }
    )

    console.log(` можно получить колоду карт, с разделением на 3 этапа:\n${splitedDeck}\nОсталось только подключить pop() к колоде, но уже не успеваю :)`);
    return splitedDeck;    
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


// distribute the deck 


