"use strict"

const scoreEl = document.getElementById("score");
const colorParts = document.querySelectorAll(".colors");
const containerEl = document.querySelector(".container");
const startBtn = document.querySelector("#start-btn");
const resultEl = document.querySelector("#score-result");
const wrapperEl = document.querySelector(".wrapper");

const colorObj = {
    color1: {current: "#ff99c8", new: "#ff6392"},
    color2: {current: "#fcf6bd", new: "#ffd97d"},
    color3: {current: "#d0f4de", new: "#7bf1a8"},
    color4: {current: "#a9def9", new: "#7bdff2"},
};

let randomColors = [];
let isPathGenerating = false;
let score = 0;
let clickCount = 0;

const getRandomColor = (colorsObj) =>{
    const colorKeys = Object.keys(colorsObj);
    return colorKeys[Math.floor(Math.random() * colorKeys.length)];
};

const delay = async (time) =>{
    return await new Promise((resolve) => setTimeout(resolve, time));
};

const generateRandomPath = async () =>{
    randomColors.push(getRandomColor(colorObj));
    score = randomColors.length;
    isPathGenerating = true;
    await showPath(randomColors);
}

const showPath = async (colors) =>{
    scoreEl.innerText = score;
    for(let color of colors){
        const currentColor = document.querySelector('.${color}');
        await delay(500);
        currentColor.style.backgroundColor = colorObj[color].new;
        await delay(600);
        currentColor.style.backgroundColor = colorObj[colors].current;
        await delay(600);
    }

    isPathGenerating = false;
};

const endGame = () =>{
    resultEl.innerHTML = '<span> Your Score : </span> ${score}';
    resultEl.classList.remove("hide");
    containerEl.classList.remove("hide");
    wrapperEl.classList.add("hide");
    startBtn.innerText = "Play Again";
    startBtn.classList.remove("hide");
};

const resetGame = () =>{
    score = 0;
    clickCount = 0;
    randomColors = [];
    isPathGenerating = false;
    wrapperEl.classList.remove("hide");
    containerEl.classList.add("hide");
    generateRandomPath();
};

const handleColorClick = async (e) =>{
    if(isPathGenerating){
        return false;
    }

    if(e.target.classList.contains(randomColors[clickCount])){
        e.target.style.backgroundColor = colorObj[randomColors[clickCount]].new;
        await delay(500);
        e.target.style.backgroundColor = colorObj[randomColors[clickCount]].current;
        clickCount++
        if(clickCount === score){
            clickCount = 0;
            generateRandomPath();
        }
    }else{
        endGame();
    }

};

startBtn.addEventListener("click", resetGame);
colorParts.forEach((color) => color.addEventListener("click", handleColorClick));