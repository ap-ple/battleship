import shipLengths from "./shipLengths";

export default class Gameboard {
   constructor() {
      this.missedAttacks = [];
      this.hitAttacks = [];
      this.ships = {
         placed: new Set(),
         unplaced: new Set(Object.keys(shipLengths))
      }
   }

   placeShipAt(x, y, shipName, orientation) {

   }

   getShipAt(x, y) {

   }

   hasShipAt(x, y) {

   }

   hasAllShips() {

   }

   hasOnlySunkShips() {

   }

   recieveAttack(x, y) {
   
   }
}