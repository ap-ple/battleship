import Gameboard from "./Gameboard.js";

export default class Player {
   static count = 0;

   constructor(name) {
      this.constructor.count++;

      this.name = name ?? `Player ${this.constructor.count}}`;

      this.gameboard = new Gameboard();
   }

   placeShipAt(x, y, shipName, orientation) {
      this.gameboard.placeShipAt(x, y, shipName, orientation);
   }

   recieveAttack(x, y) {
      const hitShip = this.gameboard.recieveAttack(x, y);

      return hitShip === null
         ? "Miss."
         : `Hit. ${hitShip.name}.`;
   }
   
   placedAllShips() {
      return this.gameboard.hasAllShips();
   }

   hasLost() {
      return this.placedAllShips() && this.gameboard.hasOnlySunkShips();
   }
}