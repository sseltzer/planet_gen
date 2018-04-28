const {Logger} = require('../../core/CoreUtils');

class Die {
    constructor(sides, seed, state = false){
      this.sides = sides;
      this.seed = seed;
      this.state = state;
      this.seedrandom = Math.seedrandom;
      this.saveableRNG = this.seedrandom(seed, {state});
    }
  
    roll(rolls = 1) {
        const outcome = [...Array(rolls)].map(roll => Math.floor(this.saveableRNG() * this.sides) + 1).reduce((prev, curr) => prev + curr);
        Logger.debug(`[DIE]: d${this.sides} rolled: ${outcome}`)
        return outcome;
      }
    }

module.exports = Die;