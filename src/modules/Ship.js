const shipLengths = {
   "Carrier": 5,
   "Battleship": 4,
   "Cruiser": 3,
   "Submarine": 3,
   "Destroyer": 2
}

export default class Ship {
   constructor(name) {
      this.hits = 0;
      this.name = name
      this.length = shipLengths[name];

      if (this.length === undefined) {
         throw new Error("Invalid ship name");
      }
   }

   hit() {
      if (!this.isSunk()) {
         this.hits++;
      }
   }

   isSunk() {
      return this.hits === this.length;
   }
}