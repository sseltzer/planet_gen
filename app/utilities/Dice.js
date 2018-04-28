const seedrandom = require('seedrandom');

class Dice {

  constructor(seed, state = false) {
    this.seed = seed;
    this.state = state;
    this.seedrandom = Math.seedrandom;
    this.saveable = seedrandom(seed, {state});
  }

  roll() {
    return this;
  }

  one() {
    this.rolls = 1;
    return this;
  }

  two() {
    this.rolls = 2;
    return this;
  }

  three() {
    this.rolls = 3;
    return this;
  }

  d6() {
    let roll = this.rollDie(6);
    this.one();
    return roll;
  }

  rollDie(sides) {
    return [...Array(this.rolls)].map(i => Math.floor(this.saveable() * sides) + 1).reduce((a, b) => a + b);
  }

  rollCommonName(name) {
    if (name === "1d6") return this.one().d6();
    if (name === "2d6") return this.two().d6();
    if (name === "3d6") return this.three().d6();
    return -1;
  }
}

module.exports = Dice;
