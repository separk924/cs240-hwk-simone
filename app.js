//const axios = require("axios");

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

// playButton.addEventListener("click", function(){
//     async function getWelcome(){
//         try{
//             let response = await axios.get("http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=start");
//             return response.data.sequence;
//         }catch(err){
//             console.log(err);
//         }
//     }

//     async function getSolution(){
//         try{
//             let response = await axios.get("http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=getSolution&rounds=" + numOfRounds.value);
//             return response.data.key;
//         }catch(err){
//             console.log(err);
//         }
//     }

//     async function print(){
//         let response = await getWelcome();
//         console.log(response);
//     }
    
//     print();
    
//     async function printSolution(){
//         let response = await getSolution();
//         console.log(response);
//     }
    
//     printSolution();
// });

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