import shipLengths from "./shipLengths";

export default class Gameboard {
   constructor() {
      this.ships = []
      this.missedAttacks = [];
      this.hitAttacks = [];
      this.unplaced = new Set(Object.keys(shipLengths));
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