import Player from "./Player.js";

export default class Game {
   constructor(...playerNames) {
      if (playerNames.length < 2) {
         playerNames.length = 2;
      }

      this.playerList = [];

      for (const playerName of playerNames) {
         this.playerList.push(new Player(playerName));
      }

      this.turn = 1;

      this.players = {
         attacking: null,
         defending: null,
         winning: null
      }

      this.updatePlayers();
   }

   updatePlayers() {
      this.players.attacking = this.playerList.at((this.turn - 1) % this.playerList.length);
      this.players.defending = this.playerList.at(this.turn % this.playerList.length);
   }

   attack(x, y) {
      this.players.attacking.attack(x, y);

      const message = this.players.defending.recieveAttack(x, y);

      this.turn++;
      this.updatePlayers();

      if (this.isOver()) {
         this.players.winning = this.playerList.find((player) => !player.hasLost());
      }

      return message;
   }

   isReady() {
      return this.playerList.every((player) => player.placedAllShips());
   }

   isOver() {
      return this.playerList.some((player) => player.hasLost());
   }
}