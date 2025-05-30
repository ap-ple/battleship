import "./styles.css"

import ships from "./modules/ships.js";

import Game from "./modules/Game.js";
import {renderGame, renderMessage} from "./modules/renderer.js";

const PLAYER = "Player";
const COMPUTER = "Computer";

const ORIENTATIONS = ["right", "down", "left", "up"];

let game = new Game(PLAYER, COMPUTER);

// TODO: Implement Player placements

for (const shipName of ships) {
   for (const player of game.playerList) {      
      while (player.gameboard.unplaced.has(shipName)) {
         try {
            const boardSize = player.gameboard.constructor.size;
      
            const x = Math.floor(Math.random() * boardSize);
            const y = Math.floor(Math.random() * boardSize);

            const orientation = ORIENTATIONS.at(Math.floor(Math.random() * ORIENTATIONS.length));
      
            player.placeShipAt(x, y, shipName, orientation);
         }
         catch {
            continue;
         }
      }
   }
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