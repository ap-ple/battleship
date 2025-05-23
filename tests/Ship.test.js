import Ship from "../src/modules/Ship";
import ships from "../src/modules/ships";

test("Ships should only sink after being hit as many times as their length", () => {
   for (const shipName of ships) {
      const ship = new Ship(shipName);

      expect(ship.hits).toEqual(0)
      expect(ship.isSunk()).toEqual(false)

      for (let hit = 0; hit < ship.length; hit++) {
         ship.hit();
      }

      expect(ship.hits).toEqual(ship.length)
      expect(ship.isSunk()).toEqual(true)
   }
});

test("Ship constructor shouldn't allow invalid names", () => {
   expect(() => {
      new Ship("Titanic")
   }).toThrow("Invalid ship name")
})