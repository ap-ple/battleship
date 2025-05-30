import "./styles.css"

import ships from "./modules/ships.js";

import Game from "./modules/Game.js";
import {renderGame, renderMessage} from "./modules/renderer.js";

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
   if (game.players.attacking.name === COMPUTER) {
      game.recieveAttack(x, y);
   }
   else {
      renderMessage(game.recieveAttack(x, y));
   }

   if (game.isOver()) {
      if (game.players.attacking.name === COMPUTER) {
         game.advanceTurns();
      }

      renderGame(game)
   }
   else if (game.players.attacking.name === COMPUTER) {
      const boardSize = game.players.defending.gameboard.constructor.size;

      do {
         x = Math.floor(Math.random() * boardSize);
         y = Math.floor(Math.random() * boardSize);
      } while (game.players.defending.gameboard.wasAttackedAt(x, y));

      // TODO: Try adjacent slots upon hitting a ship

      playTurn(x, y);
   }
   else {
      renderGame(game, {
         attack: playTurn
      });
   }
}

renderGame(game, {
   attack: playTurn
});

renderMessage("...");