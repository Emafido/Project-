document.addEventListener("DOMContentLoaded",() =>{
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.getElementById("restart");
    const nextRoundButton = document.getElementById("next-round");
    const winMessage = document.querySelector(".win-message");
    const winText = document.getElementById("win-text");
    const turnIndicator = document.querySelector(".turn-indicator");
    const startGameButton = document.getElementById("start-game");
    const gameBoard = document.querySelector(".game-board");
    const menu = document.querySelector(".menu");
    let currentPlayer = "X";
    let boardState = ["", "", "", "", "", "", "", "", "",];
    let gameActive = true;
    const winningCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    startGameButton.addEventListener("click", () => {
        menu.classList.add("hidden");
        gameBoard.classList.remove("hidden");
    });
    cells.forEach(cell => {
        cell.addEventListener("click",() => {
            const index = cell.dataset.index;
            if (! boardState[index] && gameActive){
                boardState[index] = currentPlayer;
                cell.textContent = currentPlayer;
                cell.classList.add("taken");
                checkWinner();
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                turnIndicator.textContent = `${currentPlayer}'s Turn`;
            }
        });
    });
    function checkWinner(){
        let winner = null;
        winningCombos.forEach(combo =>{
            const [a,b,c] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]){
                winner = boardState[a];
            }
        });
        if (winner){
            gameActive = false;
            winText.textContent = `${winner} Takes The Round!`;
            winMessage.classList.remove("hidden");
        } else if (! boardState.includes("")){
            gameActive = false;
            winText.textContent = "It's a Tie!";
            winMessage.classList.remove("hidden");
        }
    }
    restartButton.addEventListener("click",resetGame);
    nextRoundButton.addEventListener("click",() => {
        winMessage.classList.add("hidden");
        boardState = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("taken");
        });
        gameActive = true;
        currentPlayer = "X"
        turnIndicator.textContent =`${currentPlayer}'s Turn`;
    });
    function resetGame(){
        boardState = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("taken");
            });
            gameActive = true;
            currentPlayer = "X";
            turnIndicator.textContent = `${currentPlayer}'s Turn`;
    }
});