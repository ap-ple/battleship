import Ship from "../src/modules/Ship";

describe("creates a ship with length 5 and sinks it", () => {
   const ship = new Ship(5);

   ship.hit();

   test("ship should not be sunk after one hit", () => {
      expect(ship.hits).toEqual(1)
      expect(ship.isSunk()).toEqual(false)
   })

   ship.hit();
   ship.hit();
   ship.hit();
   ship.hit();

   test("ship should be sunk after 5 hits", () => {
      expect(ship.hits).toEqual(5)
      expect(ship.isSunk()).toEqual(true)
   })
});