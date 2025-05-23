import Ship from "./Ship";
import shipLengths from "./shipLengths";

export default class Gameboard {
   static size = 10;

   static areValidCoordinates(...coordinates) {
      return coordinates.every((coordinate) => coordinate >= 0 && coordinate < this.size);
   }

   constructor() {
      this.board = new Array(this.constructor.size);

      for (let column = 0; column < this.constructor.size; column++) {
         this.board[column] = new Array(this.size);
      }

      this.ships = []
      this.missedAttacks = [];
      this.hitAttacks = [];
      this.unplaced = new Set(Object.keys(shipLengths));
   }

   placeShipAt(x, y, shipName, orientation) {
      const shipLength = shipLengths[shipName];

      if (shipLength === undefined) {
         throw new Error("Invalid ship name");
      }

      let deltaX = 0;
      let deltaY = 0;

      switch (orientation) {
      case "right":
         deltaX = 1;
         break;
      case "down":
         deltaY = 1;
         break;
      case "left":
         deltaX = -1;
         break;
      case "up":
         deltaY = -1;
         break;
      }

      const endX = x + (shipLength - 1) * deltaX;
      const endY = y + (shipLength - 1) * deltaY;

      if (!this.constructor.areValidCoordinates(x, y, endX, endY)) {
         throw new Error("Invalid placement");
      }

      const ship = new Ship(shipLength);
      
      this.ships.push(ship);
      
      for (let delta = 0; delta < ship.length; delta++) {
         this.board[x + delta * deltaX][y + delta * deltaY] = ship;
      }

      this.unplaced.delete(shipName);
   }

   getShipAt(x, y) {
      if (!this.constructor.areValidCoordinates(x, y)) {
         throw new Error("Invalid coordinates");
      }

      return this.board[x][y] ?? null;
   }

   hasShipAt(x, y) {
      return this.getShipAt(x, y) !== null;
   }

   hasAllShips() {
      return this.unplaced.size === 0;
   }

   hasOnlySunkShips() {
      return this.ships.every((ship) => ship.isSunk());
   }

   recieveAttack(x, y) {
      const ship = this.getShipAt(x, y);
      
      if (this.hasShipAt(x, y)) {
         this.hitAttacks.push({x, y});
         ship.hit();
      }
      else {
         this.missedAttacks.push({x, y});
      }

      return ship;
   }
}