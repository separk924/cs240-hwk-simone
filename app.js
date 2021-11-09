const axios = require("axios");

let playButton = document.querySelector("#play");
let redSq = document.querySelector("#redSq");
let blueSq = document.querySelector("#blueSq");
let greenSq = document.querySelector("#greenSq");
let yellowSq = document.querySelector("#yellowSq");
let numOfRounds = document.querySelector("#rounds");

// async function print(){
//     let response = await getWelcome();
//     console.log(response);
// }

// print();

// async function printSolution(){
//     let response = await getSolution();
//     console.log(response);
// }

// printSolution();

playButton.addEventListener("click", function(){
    async function getWelcome(){
        try{
            let response = await axios.get("http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=start");
            return response.data.sequence;
        }catch(err){
            console.log(err);
        }
    }
    // async function print(){
    //     let response = await getWelcome();
    //     console.log(response);
    // }
    
    // print();

    /**
     * This function plays the sequence of the pattern on the buttons
     * @param {*} pattern The pattern that is played
     * @param {*} delay The length of the delay
     */
    async function playWelcome(pattern, delay){
        for(let i=0; i<pattern.length; i++){
            if(pattern[i]=="R"){
                playSound("red", delay);
                await changeColor(redSq, "#FF69B4", delay);
                await changeColor(redSq, "#ff0000", delay);
            }
            if(pattern[i]=="B"){
                playSound("blue", delay);
                await changeColor(blueSq, "#ADD8E6", delay);
                await changeColor(blueSq, "#0000bb", delay);
            }
            if(pattern[i]=="G"){
                playSound("green", delay);
                await changeColor(greenSq, "#90EE90", delay);
                await changeColor(greenSq, "#228B22", delay);
            }
            if(pattern[i]=="Y"){
                playSound("yellow", delay);
                await changeColor(yellowSq, "#FFFFE0", delay);
                await changeColor(yellowSq, "#daa520", delay);
            }
        }
    }
    const WELCOME_DELAY = 120;
    const SOLUTION_DELAY = 400;

    /**
     * This function changes the color of the button
     * @param {*} button The button whose color is changed
     * @param {*} color The new color
     * @param {*} delay The length of the delay
     */
    function changeColor(button, color, delay){
        return new Promise((resolve) => {
            setTimeout(() => {
                let node = button;
                node.style.backgroundColor = color;
                resolve(); // promise is resolved
            }, delay);
        });
    }
    /**
     * This function plays the sound
     * @param {*} color The color that is put into the audio file
     * @param {*} delay The length of the delay
     */
    function playSound(color, delay){
        return new Promise((resolve) => {
            setTimeout(() => {
                new Audio("sounds/" + color + ".wav").play();
                resolve(); // promise is resolved
            }, delay);
        });
    }

    async function pattern(){
        let response = await getWelcome();
        return response;
    }
    pattern();
    //let thePattern = ["G","R","Y","Y","B","B","R","B","Y","Y","G","G"];
    playWelcome(pattern(), WELCOME_DELAY);
})

/**
 * All of the event listeners for the borders of the buttons to change
 * when hovered over
 */

redSq.addEventListener("mouseover", function(){
    redSq.style.border = "solid #eeeeee 0.5px";
});
redSq.addEventListener("mouseout", function(){
    redSq.style.border = "none";
});
blueSq.addEventListener("mouseover", function(){
    blueSq.style.border = "solid #eeeeee 0.5px";
});
blueSq.addEventListener("mouseout", function(){
    blueSq.style.border = "none";
});
greenSq.addEventListener("mouseover", function(){
    greenSq.style.border = "solid #eeeeee 0.5px";
});
greenSq.addEventListener("mouseout", function(){
    greenSq.style.border = "none";
});
yellowSq.addEventListener("mouseover", function(){
    yellowSq.style.border = "solid #eeeeee 0.5px";
});
yellowSq.addEventListener("mouseout", function(){
    yellowSq.style.border = "none";
});

/**
 * All of the event listeners for the colors of the buttons to light up
 * when clicked
 */
redSq.addEventListener("mousedown", function(){
    redSq.style.backgroundColor = "#FF69B4";
});
redSq.addEventListener("mouseup", function(){
    redSq.style.backgroundColor = "#ff0000";
});
blueSq.addEventListener("mousedown", function(){
    blueSq.style.backgroundColor = "#ADD8E6";
});
blueSq.addEventListener("mouseup", function(){
    blueSq.style.backgroundColor = "#0000bb";
});
greenSq.addEventListener("mousedown", function(){
    greenSq.style.backgroundColor = "#90EE90";
});
greenSq.addEventListener("mouseup", function(){
    greenSq.style.backgroundColor = "#228B22";
});
yellowSq.addEventListener("mousedown", function(){
    yellowSq.style.backgroundColor = "#FFFFE0";
});
yellowSq.addEventListener("mouseup", function(){
    yellowSq.style.backgroundColor = "#daa520";
});

/**
 * All the event listeners that play the corresponding music for each
 * button
 */
redSq.addEventListener("click", function(){
    new Audio("sounds/red.wav").play();
});
blueSq.addEventListener("click", function(){
    new Audio("sounds/blue.wav").play();
});
greenSq.addEventListener("click", function(){
    new Audio("sounds/green.wav").play();
});
yellowSq.addEventListener("click", function(){
    new Audio("sounds/yellow.wav").play();
});