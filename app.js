let boxes = document.querySelectorAll(".box");
let gameInfo = document.querySelector(".player h2");
let newGameBtn = document.querySelector(".newgame h2");
let newGame = document.querySelector(".newgame");

let currentPlayer;
let gameGrid;

let winningPositions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Function TO initialize the game 
function init(){
    currentPlayer = "X";
    gameGrid = [ "","","","","","","","","" ];
    boxes.forEach((box,index)=>{
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList.remove("green");
    })
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    newGame.style.opacity = "0";
    

}
init();

function gameOver(){

    let answer = "";

    winningPositions.forEach((position)=>{
        // all 3 boxes should be non empty and have same value in it
        if((gameGrid[position[0]] !== "" ||gameGrid[position[1]] !== "" ||gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
           
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }else{
                answer = "O";
            }
            boxes[position[0]].classList.add("green");
            boxes[position[1]].classList.add("green");
            boxes[position[2]].classList.add("green");
    }
    })

    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`
        newGame.style.opacity = "1";
        boxes.forEach((box,index)=>{
            box.style.pointerEvents = "none";
        })
        return;
    }
    let draw = 0;
    gameGrid.forEach((box)=>{
        if(box !== "")
        draw += 1;
    })
    if(draw === 9){
        gameInfo.innerText = `Its a Draw`;
        newGame.style.opacity = "1";
    }
}
function swapturn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index){
    if(gameGrid[index] === "" ){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap turn
        swapturn();
        // Game Over
        gameOver();
        
    }
    // gameGrid.forEach((game)=>{
    //     if(gameGrid[game[8]] !== ""){
    //         gameInfo.innerText = `Its a Draw`;
    //     }
    // })
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
        console.log(`bn ${index}`);
    })
})

newGame.addEventListener("click", init);