import "./styles.css"

import ships from "./modules/ships.js";

import Game from "./modules/Game.js";
import {renderGame, renderMessage} from "./modules/renderer.js";

const PLAYER = "Player";
const COMPUTER = "Computer";

const ORIENTATIONS = ["right", "down", "left", "up"];

const randomGame = () => {
   const game = new Game(PLAYER, COMPUTER);
   
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

   return game;
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

let game;

const startGame = () => {
   startButton.disabled = true;

   renderMessage("Game start!")

   renderGame(game, {
      attack: playTurn
   });
}

const resetGame = () => {
   startButton.disabled = false;

   game = randomGame();

   renderMessage("Click Reset Game for new placement or Start Game to begin!")

   renderGame(game);
}

const startButton = document.querySelector("#start")

startButton.addEventListener("click", startGame);

const resetButton = document.querySelector("#reset")

resetButton.addEventListener("click", resetGame);

resetGame();