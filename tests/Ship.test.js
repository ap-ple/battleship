import Ship from "../src/modules/Ship";
import shipLengths from "../src/modules/shipLengths";

test("Ships should only sink after being hit as many times as their length", () => {
   const shipName = "Carrier";
   const shipLength = shipLengths[shipName];

   const ship = new Ship(shipName, shipLength);

   expect(ship.hits).toEqual(0)
   expect(ship.isSunk()).toEqual(false)

   for (let hit = 0; hit < shipLength; hit++) {
      ship.hit();
   }

   expect(ship.hits).toEqual(shipLength)
   expect(ship.isSunk()).toEqual(true)
});