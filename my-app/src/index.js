import ancients from './assets/Ancients/index.js'
import ancientsData from './data/ancients.js'

// add ancients on the screen

function addAncients () {
    const ancientsDiv = document.querySelector('.ancients');
    ancientsData.forEach((e) => {
        const oneAncient = document.createElement("div");
        ancientsDiv.appendChild(oneAncient);
        oneAncient.classList.add("ancient-card");
        console.log(e.cardFace);
        oneAncient.style.backgroundImage = "url("+e.cardFace+")";
    
    });

}

addAncients();

// console.log(ancients.azathoth);
console.log(ancientsData[0]);
