const axios = require("axios");

let playButton = document.querySelector("#play");
let redSq = document.querySelector("#redSq");
let blueSq = document.querySelector("#blueSq");
let greenSq = document.querySelector("#greenSq");
let yellowSq = document.querySelector("#yellowSq");
let numOfRounds = document.querySelector("#rounds");
let status = document.querySelector("#status");
let body = document.querySelector("body");

/**
 * Once the play button has been clicked, the game will begin
 */
playButton.addEventListener("click", function(){
    /**
     * This function gets the welcome sequence
     * @returns the welcome sequence
     */
    async function getWelcome(){
        try{
            let response = await axios.get("http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=start");
            return response.data.sequence;
        }catch(err){
            console.log(err);
        }
    }

    /**
     * This function gets the sequence
     * @param {The length of the sequence and the number of rounds to be played} rounds 
     * @returns The entire sequence
     */
    async function getSequence(rounds){
        try{
            let response = await axios.get("http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=getSolution&rounds=" + rounds);
            return response.data.key;
        }catch(err){
            console.log(err);
        }
    }

    /**
     * This function returns the sequence
     * @returns The sequence
     */
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
    const WELC_SEQ_DELAY = 3600;

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

    /**
     * This function returns the welcome sequence
     * @returns The welcome sequence
     */
    async function pattern(){
        let response = await getWelcome();
        return response;
    }

    /*************** The game begins! ***************/
    theGame();
    /**
     * This function plays the game
     */
    async function theGame(){
        await playWelcome(pattern(), WELCOME_DELAY); // plays the welcome sequence
        let theSequence = await theSeq();
        /**
         * This function plays the sound
         * @param {*} color The color that is put into the audio file
         * @param {*} delay The length of the delay
         */
        function playSeqDelay(delay){
            return new Promise((resolve) => {
                setTimeout(() => {
                    playSequence(theSequence, SOLUTION_DELAY, i)
                    resolve(); // promise is resolved
                }, delay);
            });
        }
        let theShortSeq = [];
        let arr = [];
        let button = []; // the array of the buttons clicked
        let i = 1; // the rounds counter
        let j = 1;
        theShortSeq = theSequence.slice(0,i); // gets the array of the sequence for each round
        let shortLen = theShortSeq.length;
        console.log("the entire: " + theSequence);
        let len = theShortSeq.length;
        await playSeqDelay(WELC_SEQ_DELAY); // play the i'th round

        /**
         * This function checks the status of the game. This function is called every time the user clicks on the 
         * buttons
         */
        async function checkGameStatus(){
            arr = [];
            if(button.length != theShortSeq.length){
                if(!equalAtIndex(button, theShortSeq, j)){
                    await changeStatus("Incorrect! You lose!", 800);
                    body.style.backgroundColor = "#FF69B4";
                    await playSound("wrong.wav", 800);
                    await playSound("lose.wav", 800);
                }if(equalAtIndex(button, theShortSeq, j)){
                    len -= 1;
                    await changeStatus("So far so good! " + len + " more to go!", 800);
                }
            }if(button.length == theShortSeq.length){
                if(!equalAtIndex(button, theShortSeq, j)){
                    await changeStatus("Incorrect! You lose!", 800);
                    body.style.backgroundColor = "#FF69B4";
                    await playSound("wrong.wav", 800);
                    await playSound("lose.wav", 800);
                }if(equalAtIndex(button, theShortSeq, j)){
                    await playSound("nextRound.wav", 800);
                    await changeStatus("Good job! Prepare for the next round.", 800);
                    await changeStatus("Round " + i + " of " + numOfRounds.value, 800);
                    j = 1;
                }
            }
        }

        /**
         * The event listeners that move the game forward
         */
        redSq.addEventListener("click", function(){
            let clickedButton = "R";
            new Audio("sounds/red.wav").play();
            button = buildArray(clickedButton);
            if(!arrayEquals(button, theSequence)){
                checkGameStatus();
            }
            if(arrayEquals(button, theSequence)){
                changeStatus("Yay you win!", 800);
                body.style.backgroundColor = "#2e6bf1";
                new Audio("sounds/win.mp3").play();
            }if(button.length == shortLen && !arrayEquals(button, theSequence)){
                button = [];
                i++;
                j++;
                theShortSeq = theSequence.slice(0,i); // gets the array of the sequence for each round
                shortLen = theShortSeq.length;
                len = shortLen;
                playSequence(theSequence, SOLUTION_DELAY, i); // play the i'th round
            }
        });
        blueSq.addEventListener("click", function(){
            let clickedButton = "B";
            new Audio("sounds/blue.wav").play();
            button = buildArray(clickedButton);
            if(!arrayEquals(button, theSequence)){
                checkGameStatus();
            }
            if(arrayEquals(button, theSequence)){
                changeStatus("Yay you win!", 800);
                body.style.backgroundColor = "#2e6bf1";
                new Audio("sounds/win.mp3").play();
            }if(button.length == shortLen && !arrayEquals(button, theSequence) ){
                button = [];
                i++;
                j++;
                theShortSeq = theSequence.slice(0,i); // gets the array of the sequence for each round
                shortLen = theShortSeq.length;
                len = shortLen;
                playSequence(theSequence, SOLUTION_DELAY, i); // play the i'th round
            }
        });
        greenSq.addEventListener("click", function(){
            let clickedButton = "G";
            new Audio("sounds/green.wav").play();
            button = buildArray(clickedButton);
            if(!arrayEquals(button, theSequence)){
                checkGameStatus();
            }
            if(arrayEquals(button, theSequence)){
                changeStatus("Yay you win!", 800);
                body.style.backgroundColor = "#2e6bf1";
                new Audio("sounds/win.mp3").play();
            }if(button.length == shortLen && !arrayEquals(button, theSequence)){
                button = [];
                i++;
                j++;
                theShortSeq = theSequence.slice(0,i); // gets the array of the sequence for each round
                shortLen = theShortSeq.length;
                len = shortLen;
                playSequence(theSequence, SOLUTION_DELAY, i); // play the i'th round
            }
        });
        yellowSq.addEventListener("click", function(){
            let clickedButton = "Y";
            new Audio("sounds/yellow.wav").play();
            button = buildArray(clickedButton);
            if(!arrayEquals(button, theSequence)){
                checkGameStatus();
            }
            if(arrayEquals(button, theSequence)){
                changeStatus("Yay you win!", 800);
                body.style.backgroundColor = "#2e6bf1";
                new Audio("sounds/win.mp3").play();
            }if(button.length == shortLen && equalAtIndex(button, theShortSeq, i)){
                button = [];
                i++;
                j++;
                theShortSeq = theSequence.slice(0,i); // gets the array of the sequence for each round
                shortLen = theShortSeq.length;
                len = shortLen;
                playSequence(theSequence, SOLUTION_DELAY, i); // play the i'th round
            }
        });

        /**
         * This function checks if the 2 arrays are equal
         * @param {The first array to be checked} arr1 
         * @param {The second array to be checked} arr2 
         * @returns True if arrays are equal, false otherwise
         */
        function arrayEquals(arr1, arr2) {
            // Check if the arrays are the same length
            if (arr1.length !== arr2.length) return false;
            // Check if all items exist and are in the same order
            for (var i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) return false;
            }
            // Otherwise, return true
            return true;
        };

        /**
         * This function checks if the 2 arrays are equal up until the specific index
         * @param {The first array to be checked} arr1 
         * @param {The second array to be checked} arr2 
         * @param {The specific index that the arrays are checked} len 
         * @returns True if the arrays are equal until the specified index, false otehrwise
         */
        function equalAtIndex(arr1, arr2, len) {
            // Check if all items exist and are in the same order
            for (var i = 0; i < len; i++) {
                if (arr1[i] !== arr2[i]) return false;
            }
            // Otherwise, return true
            return true;
        };
        

        /**
         * This function adds a color to the array that will be compared to the original 
         * array
         * @param {*} button The button that is checked to see which letter to add to the
         * array
         * @returns the array that is built
         */
        function buildArray(theButton){
            let color = "";
            if(theButton == "R"){
                color = "R";
            }if(theButton == "B"){
                color = "B";
            }if(theButton == "G"){
                color = "G";
            }if(theButton == "Y"){
                color = "Y";
            }
            button.push(color);
            return button;
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