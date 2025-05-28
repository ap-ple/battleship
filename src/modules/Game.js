import Player from "./Player";

export default class Game {
   constructor(...playerNames) {
      if (playerNames.length < 2) {
         playerNames.length = 2;
      }

      this._players = [];

      for (const playerName of playerNames) {
         this._players.push(new Player(playerName));
      }

      this.turn = 1;

      this.updatePlayers();
   }

   updatePlayers() {
      this.players = {
         attacking: this._players.at((this.turn - 1) % this._players.length),
         defending: this._players.at(this.turn % this._players.length)
      }
   }

   attack(x, y) {
      this.players.attacking.attack(x, y);
      this.players.defending.recieveAttack(x, y);

      this.turn++;
      this.updatePlayers();
   }

   isReady() {
      return this._players.every((player) => player.placedAllShips());
   }
}