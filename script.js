const colorCodeContainer = document.getElementById('color-code');
const optionsContainer = document.getElementById('options-container');
const showScore = document.getElementById('score');

let randomColor = null;
let score = null;


function generateRandomNumberBetween(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomColorRGB() {
    const red = generateRandomNumberBetween(0,255);
    const green = generateRandomNumberBetween(0,255);
    const blue = generateRandomNumberBetween(0,255);
    return `rgb(${red}, ${green}, ${blue})`;
}

function incrementScore() {
    score += 1;
    showScore.innerText = score;
}

function validateResult(result) {
    
    const selectedColor = result.target.style.backgroundColor;
    if(selectedColor === randomColor) {
        incrementScore();
    } else {
        score = 0;
    }
    window.localStorage.setItem("score", score);
    startGame();
    
}

function startGame() {
    score = Number(window.localStorage.getItem('score')) ?? 0;
    showScore.innerText = score;
    optionsContainer.innerHTML = null;
    randomColor = generateRandomColorRGB();
    colorCodeContainer.innerText = randomColor;

    const ansIndex = generateRandomNumberBetween(0,5);

    for(let i = 0 ;i<6;i++) {
        let div = document.createElement('div');
        div.addEventListener('click', validateResult)
        div.style.backgroundColor = i===ansIndex ? randomColor : generateRandomColorRGB();
        optionsContainer.appendChild(div);
    }
}

window.addEventListener('load', startGame())


