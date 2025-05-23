import Gameboard from "../src/modules/Gameboard";
import Player from "../src/modules/Player";

test("Players should have a gameboard object property", () => {
   const player = new Player();

   expect(player.gameboards.ocean instanceof Gameboard).toEqual(true);
   expect(player.gameboards.target instanceof Gameboard).toEqual(true);
})

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