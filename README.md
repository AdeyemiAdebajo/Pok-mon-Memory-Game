# Pokémon Memory Match (4×4)

A simple browser-based matching game built with HTML/CSS/JS.  
It fetches 8 random Pokémon from the public **PokeAPI** and creates a 4×4 board with pairs.

## How to run
Just open `index.html` in any modern browser. No build step required.

## Game rules
- Click two cards to reveal them.
- If they match, they stay revealed. If not, they flip back after a short delay.
- The timer starts when the Pokémon are loaded and stops when all 8 pairs are matched.
- A dialog pops up with your final time.