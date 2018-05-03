const seedrandom = require('seedrandom');

let rolls = [
  {
    funct: 'one',
    times: 1
  }, {
    funct: 'two',
    times: 2
  }, {
    funct: 'three',
    times: 3
  }, {
    funct: 'four',
    times: 4
  }
];
let die = [6, 10, 12, 20];

class Dice {

  constructor(seed, state = false) {
    this.seed = seed;
    this.state = state;
    this.seedrandom = Math.seedrandom;
    this.saveable = seedrandom(seed, {state});
    
    rolls.map(r => this[r.funct] = () => {
      this.rolls = r.times;
      return this;
    });

    die.map(d => this[`d${d}`] = () => {
      let roll = this.rollDie(d);
      this.one();
      return roll;
    });
  }

  rollDie(sides) {
    return [...Array(this.rolls)].map(() => Math.floor(this.saveable() * sides) + 1).reduce((a, b) => a + b);
  }

  rollCommonName(name) {
    return this.roll(name);
  }
  roll(name) {
    if (!name) return this;
    if (!name.indexOf('d')) return null;
    let rollParts = name.split('d');
    if (rollParts.length !== 2) return null;
    rollParts.map(rp => {if (!this[rp]) return null;});
    let rollTimes = rolls.filter(r => r.times == rollParts[0]);
    if (!rollTimes) return null;
    return this[rollTimes[0].funct]()[`d${rollParts[1]}`]();
  }
}

module.exports = Dice;
