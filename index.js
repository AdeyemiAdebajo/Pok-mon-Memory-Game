const board = document.getElementById("gameboard");
let deck = [];
let timer, startTime;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

// function to fetch pokemon from API
async function fetchPokemon(count = 8) {
  let pokemonsCards = []; // array to hold the pokemon cards

  for (let i = 1; i <= count; i++) {
    let randomId = Math.floor(Math.random() * 898) + 1; // get random pokemon ID Generation 1 up to Generation 8.
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + randomId);
    let data = await response.json();
    let image =
      data.sprites.other["official-artwork"].front_default ||
      data.sprites.front_default;

    pokemonsCards.push({
      id: data.id,
      name: data.name,
      img: image,
    });
  }
  return pokemonsCards;
}
// function to shuffle the deck
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));// random index from 0 to i
    // swap elements deck[i] and deck[j]
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
// Fill the deck with pairs of cards
function fillTable () {
    const cells= board.querySelectorAll("td");
    cells.forEach((cell, i) => {
        cell.innerHTML = "";
        cell.className="";
        const poke= deck[i];
        cell.dataset.id= poke.id;
        const pokeImage = document.createElement("img");
        pokeImage.src = poke.img;
        pokeImage.alt = poke.name;
        cell.appendChild(pokeImage);


    })
}
//Click handler
board.addEventListener("click", (e) => {
    const cell=e.target.closest("td");
    if (!cell || lockBoard || cell.classList.contains("matched") || cell.classList.contains("revealed")) return;
  flip(cell);
   
  
});

// Flip card function
function flip(cell) {
    cell.classList.add("revealed");
    if (!firstCard) {
        firstCard = cell;
    } else {
        secondCard = cell;
        checkForMatch();
    }
}
// Check for match function
function checkForMatch() {
    if (firstCard.dataset.id === secondCard.dataset.id) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matches++;
        resetTurn();
        if(matches===8){
            stopTimer();
            document.getElementById("status").textContent = `Congratulations! You found all matches in ${document.getElementById("timer").textContent}`;

        }
    } else {
        lockBoard = true;
        setTimeout(() => {
         
            firstCard.classList.remove("revealed");
            secondCard.classList.remove("revealed");
        
            resetTurn();
        }, 1000);
    }
}
// Reset turn function
function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}
// Timer functions
function startTimer() {
  startTime = Date.now();
  timer = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const min = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const sec = String(elapsed % 60).padStart(2, "0");
    document.getElementById("timer").textContent = `${min} mins:${sec} ec`;
  }, 1000);
}
function stopTimer() {
  clearInterval(timer);
}

// Start game function and shuffle deck
async function shuffleCards() {
  const pokes = await fetchPokemon(8);
  deck = shuffleDeck([...pokes, ...pokes]); // make pairs
}
// Start game function
async function startGame() {
    stopTimer();
    matches = 0;
    document.getElementById("status").textContent = "";
    document.getElementById("timer").textContent = "00:00";

    await shuffleCards();
    fillTable();
    startTimer();
}
document.getElementById("restartBtn").addEventListener("click", startGame);

// Start automatically
window.onload = startGame;