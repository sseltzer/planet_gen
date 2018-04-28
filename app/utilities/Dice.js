const seedrandom = require('seedrandom');



class Dice {
  constructor(dice = []) {
    this.dice = dice
  }

  roll(rolls) {
   return [...this.dice].map(die => die.roll(rolls)).reduce((prev,curr)=> prev + curr);
  }
}


module.exports = Dice;
