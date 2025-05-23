import Player from "../src/modules/Player";

test("Players should report hits and misses", () => {
   const player = new Player();

   const ship = {
      x: 1,
      y: 2,
      name: "Destroyer"
   }

   player.placeShipAt(ship.x, ship.y, ship.name, "right");

   expect(player.recieveAttack(ship.x, ship.y)).toEqual(`Hit. ${ship.name}.`);

   expect(player.recieveAttack(ship.x, ship.y + 1)).toEqual("Miss.");
})

test("Players shouldn't send the same attack twice", () => {
   const player = new Player();

   const attack = {
      x: 1,
      y: 2
   }

   player.sendAttack(attack.x, attack.y);

   expect(() => {
      player.sendAttack(attack.x, attack.y)
   }).toThrow("Square already attacked");
})