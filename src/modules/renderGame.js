const boards = document.querySelector("#boards");

const renderBoard = (player, callback) => {
   const board = document.createElement("div");

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

export default (game) => {
   boards.innerHTML = "";

   boards.appendChild(renderBoard(
      game.players.attacking
   ));

   boards.appendChild(renderBoard(
      game.players.defending, (x, y) => game.recieveAttack(x, y)
   ));
}