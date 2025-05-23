import Gameboard from "../src/modules/Gameboard";
import ships from "../src/modules/ships";

test("Gameboard should allow placing of ships", () => {
   const gameboard = new Gameboard();

   const ship = {
      x: 1,
      y: 2,
      name: "Destroyer"
   }

   gameboard.placeShipAt(ship.x, ship.y, ship.name, "right");

   expect(gameboard.hasShipAt(ship.x, ship.y)).toEqual(true);
})

test("Gameboard shouldn't allow placing of ships outside of board", () => {
   const gameboard = new Gameboard();

   const ship = {
      x: 1,
      y: 2,
      name: "Carrier"
   }

   expect(() => {
      gameboard.placeShipAt(ship.x, ship.y, ship.name, "left")
   }).toThrow("Invalid placement");
})

test("Gameboard shouldn't allow placing the same ship twice", () => {
   const gameboard = new Gameboard();

   const ship = {
      x: 1,
      y: 2,
      name: "Destroyer"
   }

   gameboard.placeShipAt(ship.x, ship.y, ship.name, "right")

   expect(() => {
      gameboard.placeShipAt(ship.x, ship.y + 1, ship.name, "right")
   }).toThrow("Ship already placed");
})

test("Gameboard shouldn't allow placing overlapping ships", () => {
   const gameboard = new Gameboard();

   const ship = {
      x: 1,
      y: 2,
      name: "Carrier"
   }

   gameboard.placeShipAt(ship.x + 1, ship.y, ship.name, "right")

   expect(() => {
      gameboard.placeShipAt(ship.x + 1, ship.y, "Destroyer", "right")
   }).toThrow("Invalid placement");
})

test("Gameboard should know if a spot is empty", () => {
   const gameboard = new Gameboard();

   const coordinates = {
      x: 1,
      y: 2
   }

   expect(gameboard.getShipAt(coordinates.x, coordinates.y)).toEqual(null);

   expect(gameboard.hasShipAt(coordinates.x, coordinates.y)).toEqual(false);
})

test("Gameboard shouldn't allow accessing coordinates outside of board", () => {
   const gameboard = new Gameboard();

   const coordinates = {
      x: -1,
      y: -1
   }

   expect(() => {
      gameboard.getShipAt(coordinates.x, coordinates.y)
   }).toThrow("Invalid coordinates");

   expect(() => {
      gameboard.hasShipAt(coordinates.x, coordinates.y)
   }).toThrow("Invalid coordinates");

   expect(() => {
      gameboard.recieveAttack(coordinates.x, coordinates.y)
   }).toThrow("Invalid coordinates");
})

test("Gameboard should allow sinking of ships", () => {
   const gameboard = new Gameboard();

   const ship = {
      x: 1,
      y: 2,
      name: "Destroyer"
   }

   gameboard.placeShipAt(ship.x, ship.y, ship.name, "right");

   const shipObject = gameboard.getShipAt(ship.x, ship.y);

   expect(shipObject.isSunk()).toEqual(false);

   for (let i = 0; i < shipObject.length; i++) {
      gameboard.recieveAttack(ship.x + i, ship.y);
   }

   expect(shipObject.isSunk()).toEqual(true);
})

test("Gameboard should know where missed attacks are", () => {
   const gameboard = new Gameboard();

   const ship = {
      x: 1,
      y: 2,
      name: "Destroyer"
   }

   gameboard.placeShipAt(ship.x, ship.y, ship.name, "right");

   const attack = {
      x: ship.x,
      y: ship.y + 1
   }

   gameboard.recieveAttack(attack.x, attack.y);

   expect(gameboard.attacks.missed.at(0)).toEqual(attack);
})

test("Gameboard should know where hit attacks are", () => {
   const gameboard = new Gameboard();

   const ship = {
      x: 1,
      y: 2,
      name: "Destroyer"
   }

   gameboard.placeShipAt(ship.x, ship.y, ship.name, "right");

   const attack = {
      x: ship.x,
      y: ship.y
   }

   gameboard.recieveAttack(attack.x, attack.y);

   expect(gameboard.attacks.hit.at(0)).toEqual(attack);
})

test("Gameboard shouldn't allow attacks on already attacked squares", () => {
   const gameboard = new Gameboard();

   const attack = {
      x: 1,
      y: 2
   }

   gameboard.recieveAttack(attack.x, attack.y);

   expect(() => {
      gameboard.recieveAttack(attack.x, attack.y)
   }).toThrow("Square already attacked");
})

test("Gameboard should know which ships aren't placed", () => {
   const gameboard = new Gameboard();

   const placed = ["Cruiser", "Destroyer"];
   const unplaced  = new Set(["Carrier", "Battleship", "Submarine"]);

   let y = 0;

   for (const shipName of placed) {
      gameboard.placeShipAt(0, y, shipName, "right");

      y++;
   }

   expect(gameboard.unplaced).toEqual(unplaced);
})

test("Gameboard should know when all ships are placed", () => {
   const gameboard = new Gameboard();

   let y = 0;

   for (const shipName of ships) {
      gameboard.placeShipAt(0, y, shipName, "right");

      y++;
   }

   expect(gameboard.hasAllShips()).toEqual(true);
})

test("Gameboard should know when all ships are sunk", () => {
   const gameboard = new Gameboard();

   let y = 0;

   for (const shipName of ships) {
      gameboard.placeShipAt(0, y, shipName, "right");

      const ship = gameboard.getShipAt(0, y);

      for (let x = 0; x < ship.length; x++) {
         gameboard.recieveAttack(x, y);
      }

      y++;
   }

   expect(gameboard.hasOnlySunkShips()).toEqual(true);
})