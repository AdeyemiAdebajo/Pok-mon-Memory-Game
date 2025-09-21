const board = Document.getElementById("gameboard");
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
    let randomID = Math.floor(Math.random() * 898) + 1; // get random pokemon ID Generation 1 up to Generation 8.
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