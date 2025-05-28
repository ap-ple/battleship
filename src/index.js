import "./styles.css"

import ships from "./modules/ships.js";

import Game from "./modules/Game.js";
import renderGame from "./modules/renderGame.js";

const PLAYER = "Player";
const COMPUTER = "Computer";

let game = new Game(PLAYER, COMPUTER);

// TODO: Implement Player and Computer placements

let y = 0;

for (const shipName of ships) {
   for (const player of game.playerList) {
      player.placeShipAt(0, y, shipName, "right");
   }

   y++;
}

renderGame(game)
