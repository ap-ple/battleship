import Gameboard from "./Gameboard.js";

export default class Player {
   static count = 0;

   constructor(name) {
      this.constructor.count++;

      this.name = name ?? `Player ${this.constructor.count}}`;

      this.gameboards = {
         ocean: new Gameboard(),
         target: new Gameboard()
      };
   }

   placeShipAt(x, y, shipName, orientation) {
      this.gameboards.ocean.placeShipAt(x, y, shipName, orientation);
   }

   recieveAttack(x, y) {
      const hitShip = this.gameboards.ocean.recieveAttack(x, y);

      return hitShip === null
         ? "Miss."
         : `Hit. ${hitShip.name}.`;
   }

   attack(x, y) {
      this.gameboards.target.recieveAttack(x, y);
   }

   placedAllShips() {
      return this.gameboards.ocean.hasAllShips();
   }
}