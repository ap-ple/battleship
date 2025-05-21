import Ship from "../src/modules/Ship";

test("Ship of length 5 should sink only after 5 hits", () => {
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