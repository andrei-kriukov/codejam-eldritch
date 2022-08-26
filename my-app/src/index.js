import ancients from './assets/Ancients/index.js'
import ancientsData from './data/ancients.js'

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


function getLevels (ancientName) {
    let levels = ancientsData.filter((e) => {
        if (e.id === ancientName) {
         return true;
        } else {return false};
     })
    return levels;
}



function addLevels (ancientName) {

    let circles = [];

    for (let i = 0; i < 9; i++) {
         const circle = document.getElementById(`level_${i}`);
         circles.push(circle);
    }

    const stages = ['firstStage', 'secondStage', 'thirdStage'];
        
    let numbers = [];

    let result = getLevels(ancientName);
    
    stages.forEach((e) => {
        numbers.push(result[0][e].greenCards);
        numbers.push(result[0][e].brownCards);
        numbers.push(result[0][e].blueCards);
    });

    for (let i = 0; i < circles.length; i++) {
        circles[i].innerHTML = numbers[i];
    }
    
}
  

const ancientsDiv = document.querySelector('.ancients');

ancientsDiv.addEventListener('click', (e) => {
    addLevels(e.target.name);
});



