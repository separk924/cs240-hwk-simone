const axios = require("axios");

let playButton = document.querySelector("#play");
let redSq = document.querySelector("#redSq");
let blueSq = document.querySelector("#blueSq");
let greenSq = document.querySelector("#greenSq");
let yellowSq = document.querySelector("#yellowSq");
let numOfRounds = document.querySelector("#rounds");
let status = document.querySelector("#status");
let body = document.querySelector("body");

playButton.addEventListener("click", function(){
    async function getWelcome(){
        try{
            const data = { type: {"start" : "sequence"} };
            let response = await axios.get("http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=start");
            return response.data.sequence;
        }catch(err){
            console.log(err);
        }
    }

    async function getSequence(rounds){
        try{
            const data = {type: {"solution" : "key"} }
            let response = await axios.get("http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=getSolution&rounds=" + rounds);
            return response.data.key;
        }catch(err){
            console.log(err);
        }
    }
    async function theSeq(){
        let response = await getSequence(numOfRounds.value);
        return response;
    }

    /**
     * This function plays the welcome sequence of the pattern on the buttons
     * @param {*} pattern The pattern that is played
     * @param {*} delay The length of the delay
     */
    async function playWelcome(pattern, delay){
        let thePat = await pattern;
        for(let i=0; i<thePat.length; i++){
            if(thePat[i]=="R"){
                playSound("red.wav", delay);
                await changeColor(redSq, "#FF69B4", delay);
                await changeColor(redSq, "#ff0000", delay);
            }
            if(thePat[i]=="B"){
                playSound("blue.wav", delay);
                await changeColor(blueSq, "#ADD8E6", delay);
                await changeColor(blueSq, "#0000bb", delay);
            }
            if(thePat[i]=="G"){
                playSound("green.wav", delay);
                await changeColor(greenSq, "#90EE90", delay);
                await changeColor(greenSq, "#228B22", delay);
            }
            if(thePat[i]=="Y"){
                playSound("yellow.wav", delay);
                await changeColor(yellowSq, "#FFFFE0", delay);
                await changeColor(yellowSq, "#daa520", delay);
            }
        }
    }

    /**
     * This function plays the sequence for each round
     * @param {The pattern that is played} pattern
     * @param {The length of the delay} delay
     * @param {The length of how much of the pattern to play} theLen
     */
     async function playSequence(pattern, delay, theLen){
        let thePat = await pattern;
        for(let i=0; i<theLen; i++){
            if(thePat[i]=="R"){
                playSound("red.wav", delay);
                await changeColor(redSq, "#FF69B4", delay);
                await changeColor(redSq, "#ff0000", delay);
            }
            if(thePat[i]=="B"){
                playSound("blue.wav", delay);
                await changeColor(blueSq, "#ADD8E6", delay);
                await changeColor(blueSq, "#0000bb", delay);
            }
            if(thePat[i]=="G"){
                playSound("green.wav", delay);
                await changeColor(greenSq, "#90EE90", delay);
                await changeColor(greenSq, "#228B22", delay);
            }
            if(thePat[i]=="Y"){
                playSound("yellow.wav", delay);
                await changeColor(yellowSq, "#FFFFE0", delay);
                await changeColor(yellowSq, "#daa520", delay);
            }
        }
    }
    const WELCOME_DELAY = 120;
    const SOLUTION_DELAY = 400;
    const WELC_SEQ_DELAY = 4000;

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
     function changeStatus(theMessage, delay){
        return new Promise((resolve) => {
            setTimeout(() => {
                status.innerHTML = theMessage;
                resolve(); // promise is resolved
            }, delay);
        });
    }

    /**
     * This function plays the sound of the file
     * @param {*} color The color that is put into the audio file
     * @param {*} delay The length of the delay
     */
     function playSound(file, delay){
        return new Promise((resolve) => {
            setTimeout(() => {
                new Audio("sounds/" + file).play();
                resolve(); // promise is resolved
            }, delay);
        });
    }

    async function pattern(){
        let response = await getWelcome();
        return response;
    }

    /*************** The game begins! ***************/
    theGame();
    async function theGame(){
        await playWelcome(pattern(), WELCOME_DELAY);
        let theSequence = await theSeq();
        for(let i=1; i<=numOfRounds.value;i++){
            let arr = [];
            let stat = "";
            await round(i, theSequence);
            if(arr === theSequence){
                playSound("nextRound.wav", 800);
                changeStatus("Good job! Prepare for the next round.", 800);
                status.innerHTML = "Round " + i+1 + " of " + numOfRounds.value;
            }if(arr !== theSequence){
                break;
            }
        }
        if(arr == theSequence){
            status.innerHTML = "Yay you win!";
            body.backgroundColor = "#2e6bf1";
            new Audio("sounds/win.mp3").play();
        }
        /**
         * This function plays 1 round of the game
         * @param {The length of the round} theLen
         * @param {The pattern to be played} pattern
         */
        async function round(theLen, pattern){
            arr = [];
            let stat = "";
            let len = theLen;
            await playSequence(pattern, SOLUTION_DELAY, theLen);
            for(let i=0;i<theLen;i++){
                let clickedButton = "";
                redSq.addEventListener("click", function(){
                    clickedButton = "R";
                    new Audio("sounds/red.wav").play();
                });
                blueSq.addEventListener("click", function(){
                    clickedButton = "B";
                    new Audio("sounds/blue.wav").play();
                });
                greenSq.addEventListener("click", function(){
                    clickedButton = "G";
                    new Audio("sounds/green.wav").play();
                });
                yellowSq.addEventListener("click", function(){
                    clickedButton = "Y";
                    new Audio("sounds/yellow.wav").play();
                });
                let button = buildArray(clickedButton);
                console.log(button);
                console.log(pattern);
                if(button.length == theLen){
                if(button[i] === pattern[i]){
                    status.innerHTML = "So far so good! " + len-1 + " more to go!";
                }if(button[i] !== pattern[i]){
                    status.innerHTML = "Incorrect! You lose!";
                    body.backgroundColor = "#FF69B4";
                    await playSound("wrong.wav", 800);
                    await playSound("lose.wav", 800);
                    break;
                }
                len--;
                }  
            }
        }
        /**
         * This function adds a color to the array that will be compared to the original 
         * array
         * @param {*} button The button that is checked to see which letter to add to the
         * array
         * @returns the array that is built
         */
        function buildArray(button){
            let color = "";
            if(button == redSq){
                color = "R";
            }if(button == blueSq){
                color = "B";
            }if(button == greenSq){
                color = "G";
            }if(button == yellowSq){
                color = "Y";
            }
            arr.push(color);
            return arr;
        }
    }
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
})