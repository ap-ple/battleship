import Gameboard from "./Gameboard";

export default class Player {
   constructor() {
      this.gameboards = {
         ocean: new Gameboard(),
         target: new Gameboard()
      };
   }

   recieveAttack() {
      
   }
}