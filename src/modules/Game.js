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
         defending: null
      }

      this.updatePlayers();
   }

   updatePlayers() {
      this.players.attacking = this.playerList.at((this.turn - 1) % this.playerList.length);
      this.players.defending = this.playerList.at(this.turn % this.playerList.length);
   }

   recieveAttack(x, y) {
      const message = this.players.defending.recieveAttack(x, y);

      if (this.isOver()) {
         return `${this.playerList.find((player) => !player.hasLost())} wins!`;
      }

      this.turn++;
      this.updatePlayers();

      return message;
   }

   isReady() {
      return this.playerList.every((player) => player.placedAllShips());
   }

   isOver() {
      return this.playerList.some((player) => player.hasLost());
   }
}