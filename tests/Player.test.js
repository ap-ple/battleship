import Gameboard from "../src/modules/Gameboard";
import Player from "../src/modules/Player";

test("New players should have a gameboard object property", () => {
   const player = new Player();

   expect(player.gameboard instanceof Gameboard).toEqual(true);
})