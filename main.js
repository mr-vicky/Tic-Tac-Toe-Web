let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game-btn");
let messageContainer = document.querySelector(".message-container");
let message = document.querySelector("#message");
let gamePage = document.querySelector(".game-page")
let drawText = document.querySelector("#draw-text");

let playBtn = document.querySelector("#play-btn");
let home = document.querySelector(".home");
console.log(playBtn)
let homeBtn = document.querySelector("#new-game-home-btn");

let turnO = true;
const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const playGame = () => {
    home.classList.add("hide");
    gamePage.classList.remove("hide");
    messageContainer.classList.add("hide");
    resetGame();
}

const goHome = () => {
    home.classList.remove("hide");
    gamePage.classList.add("hide");
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    messageContainer.classList.add("hide");
    drawText.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was Clicked");
        
        if(turnO === true){
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes){
         box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const isDraw = () => {
    for(let box of boxes){
        if(box.innerText == ""){
            return false;
        }
    }
    return true;
}

const showWinner = (winner) =>{
    message.innerText = `Congratulations, Winner is the ${winner}`;
    messageContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    let winner = false;
    for(let pattern of winningPattern){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                winner = true;
                disableBoxes();
            }
        }
    }
    if(winner == false && isDraw()){
        drawText.classList.remove("hide");
    }
}

playBtn.addEventListener("click", playGame);
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame)
homeBtn.addEventListener("click", goHome);
