const boards = document.querySelector("#boards");

const renderedBoard = (player, attackCallback) => {
   const board = document.createElement("div");

   board.className = "board";

   const size = player.gameboard.constructor.size;

   const tagName = attackCallback === undefined
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
               space.addEventListener("click", () => attackCallback(x, y));
            }

            continue;
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

   return board;
}

const renderGame = (game, attackCallback) => {
   boards.innerHTML = "";

   boards.appendChild(renderedBoard(
      game.players.attacking
   ));

   boards.appendChild(renderedBoard(
      game.players.defending, attackCallback
   ));
}

export default renderGame;