const board = document.getElementById("gameboard");
let deck = [];
let timer, startTimer;
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
    if (!cell || lock || cell.classList.contains("matched") || cell.classList.contains("revealed")) return;
  flip(cell);
});
