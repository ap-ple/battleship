import Gameboard from "./Gameboard";

export default class Player {
   constructor() {
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
}