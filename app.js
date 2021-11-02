const axios = require("axios");

// let playButton = document.querySelector("#play");
// let red = document.querySelector("#redSq");
// let blue = document.querySelector("#blueSq");
// let green = document.querySelector("#greenSq");
// let yellow = document.querySelector("#yellowSq");


async function getWelcome(){
    try{
        let response = await axios.get("http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=start");
        return response.data.sequence;
    }catch(err){
        console.log(err);
    }
}

async function print(){
    let response = await getWelcome();
    console.log(response);
}

print();

// playButton.addEventListener("click", function(){

// });

// red.addEventListener("click", function(){

// });
// blue.addEventListener("click", function(){
    
// });
// green.addEventListener("click", function(){
    
// });
// yellow.addEventListener("click", function(){
    
// });