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

const playTurn = (x, y) => {
   game.recieveAttack(x, y)

   if (game.isOver()) {
      renderGame(game)
   }
   else if (game.players.attacking.name === COMPUTER) {
      const boardSize = game.players.defending.gameboard.constructor.size;

      do {
         x = Math.floor(Math.random() * boardSize);
         y = Math.floor(Math.random() * boardSize);
      } while (game.players.defending.gameboard.wasAttackedAt(x, y));

      playTurn(x, y);
   }
   else {
      renderGame(game, playTurn);
   }
}

renderGame(game, playTurn);
