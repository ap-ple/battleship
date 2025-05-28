import Game from "../src/modules/Game";
import ships from "../src/modules/ships";

test("Game should switch players after attack is successfully sent", () => {
   const game = new Game("Player", "Computer");

   expect(game.players.attacking.name).toEqual("Player");
   expect(game.players.defending.name).toEqual("Computer");

   game.recieveAttack(1, 2);

   expect(game.players.attacking.name).toEqual("Computer");
   expect(game.players.defending.name).toEqual("Player");
})

test("Game should know when it is ready to play", () => {
   const game = new Game("Player", "Computer");

   expect(game.isReady()).toEqual(false);

   let y = 0;
   
   for (const shipName of ships) {
      for (const player of game.playerList) {
         player.placeShipAt(0, y, shipName, "right");
      }

      y++;
   }

   expect(game.isReady()).toEqual(true);
})