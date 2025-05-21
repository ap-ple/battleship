import Ship from "../src/modules/Ship";

test("creates a ship with length 5 and sinks it", () => {
   const ship = new Ship(5);

   ship.hit();

   expect(ship.hits).toEqual(1)
   expect(ship.isSunk()).toEqual(false)
   
   ship.hit();
   ship.hit();
   ship.hit();
   ship.hit();

   expect(ship.hits).toEqual(5)
   expect(ship.isSunk()).toEqual(true)
});