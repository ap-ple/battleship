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

   placeShipAt() {

   }

   getShipAt() {

   }

   hasShipAt() {

   }

   hasAllShips() {

   }

   hasOnlySunkShips() {
      
   }

   recieveAttack() {
   
   }
}