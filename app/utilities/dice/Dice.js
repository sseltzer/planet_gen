const seedrandom = require("seedrandom");
const Die = require("./Die");
const { compose } = require("stampit");

const dice = compose({
  methods: {
    d6: () => Die(),
    d12: () => Die({ sides: 12 }),
    d20: () => Die({ sides: 20 })
  }
});

let Dice = compose({
  props: {
    seed: undefined,
    state: undefined
  },
  init({ seed = this.seed, state = this.state }) {
    this.seed = seed;
    this.state = state;
    this.seedrandom = Math.seedrandom;
    this.saveable = seedrandom(seed, { state });
  },
  methods: {
    roll() {
      return this;
    }
  }
});

const ThrowMany = compose({
  methods: {
    two() {
      this.rolls = 2;
      return this;
    },
    three() {
      this.rolls = 3;
      return this;
    },
    four() {
      this.rolls = 3;
      return this;
    },
    five() {
      this.rolls = 5;
      return this;
    }
  }
});

const expDice = compose(Dice, ThrowMany, dice);
const expDiceInstance = expDice({ seed: Math.random() });
module.exports = { Dice: expDice, dice: expDiceInstance };
