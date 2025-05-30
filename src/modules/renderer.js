const boardsElement = document.querySelector("#boards");

const messageElement = document.querySelector("#message");

const turnElement = document.querySelector("#turn");

const renderedPlayer = (player, callback, showShips = true) => {
   const playerElement = document.createElement("div");
   
   playerElement.className = "player";
   playerElement.textContent = `${player.name}'s board`;

   const board = document.createElement("div");

   playerElement.appendChild(board);

   board.className = "board";

   const size = player.gameboard.constructor.size;

   const tagName = callback === undefined
      ? "div"
      : "button"
   ;
   
   for (let x = 0; x < size; x++) {
      const column = document.createElement("div");

      board.appendChild(column);

      for (let y = 0; y < size; y++) {
         const space = document.createElement(tagName);

         column.appendChild(space);

         space.className = "space";

         if (player.gameboard.attacks.hit.some((attack) => attack.x === x && attack.y === y)) {
            space.classList.add("hit")
         }

         if (player.gameboard.attacks.missed.some((attack) => attack.x === x && attack.y === y)) {
            space.classList.add("miss")
         }

         if (tagName === "button") {
            if (player.gameboard.wasAttackedAt(x, y)) {
               space.disabled = true;
            }
            else {
               space.addEventListener("click", () => callback(x, y));
            }
         }

         if (!showShips) {
            continue
         }

         if (player.gameboard.hasShipAt(x, y)) {
            space.classList.add("ship")

            const ship = player.gameboard.getShipAt(x, y);

            if (ship.isSunk()) {
               space.classList.add("sunk");
            }
         }
      }
   }

   return playerElement;
}

const renderGame = (game, callbacks = {}) => {
   boardsElement.innerHTML = "";

   boardsElement.appendChild(renderedPlayer(
      game.players.attacking, callbacks.place
   ));

   boardsElement.appendChild(renderedPlayer(
      game.players.defending, callbacks.attack, game.isOver()
   ));

   turnElement.textContent = game.isOver()
      ? `Game over! ${game.players.winning.name} wins!`
      : `Your turn, ${game.players.attacking.name}.`
   ;
}

const renderMessage = (message) => {
   messageElement.textContent = message ?? messageElement.textContent;
}
 
export {renderGame, renderMessage};