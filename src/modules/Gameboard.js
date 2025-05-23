import Ship from "./Ship";
import ships from "./ships";

export default class Gameboard {
   static size = 10;

   static constructBoard() {
      const board = new Array(this.size);

      for (let column = 0; column < this.size; column++) {
         board[column] = new Array(this.size);
      }

      return board;
   }

   static areValidCoordinates(...coordinates) {
      return coordinates.every((coordinate) => coordinate >= 0 && coordinate < this.size);
   }

   constructor() {
      this.board = this.constructor.constructBoard();

      this.unplaced = new Set(ships);
      
      this.ships = []
      this.attacks = {
         hit: [],
         missed: []
      }
   }

   placeShipAt(x, y, shipName, orientation) {
      const ship = new Ship(shipName);

      if (!this.unplaced.has(shipName)) {
         throw new Error("Ship already placed");
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

      const endX = x + (ship.length - 1) * deltaX;
      const endY = y + (ship.length - 1) * deltaY;

      if (!this.constructor.areValidCoordinates(x, y, endX, endY)) {
         throw new Error("Invalid placement");
      }

      for (let delta = 0; delta < ship.length; delta++) {
         if (this.board[x + delta * deltaX][y + delta * deltaY] !== undefined) {
            throw new Error("Invalid placement");
         }
      }
      
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

   wasAttackedAt(x, y) {
      const attackArrays = Object.values(this.attacks);

      return attackArrays.some(
         (array) => array.some(
            (attack) => attack.x === x && attack.y === y
         )
      );
   }

   recieveAttack(x, y) {
      if (this.wasAttackedAt(x, y)) {
         throw new Error("Square already attacked");
      }

      const ship = this.getShipAt(x, y);

      if (this.hasShipAt(x, y)) {
         this.attacks.hit.push({x, y});
         ship.hit();
      }
      else {
         this.attacks.missed.push({x, y});
      }

      return ship;
   }
}