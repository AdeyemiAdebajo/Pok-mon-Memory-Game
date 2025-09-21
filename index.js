const board = Document.getElementById("gameboard");
let deck = [];
let timer, startTimer;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
window.onload=function(){
    shuffleCards();
    startGame();
}