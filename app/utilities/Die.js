const { compose } = require("stampit");
const Die = compose({
  props: {
    sides: 6
  },
  init({ sides = this.sides }) {
    this.sides = sides;
    return this.roll;
  },
  methods: {
    rollDie() {
      [...Array(this.rolls)]
        .map(roll => Math.floor(this.saveable() * sides) + 1)
        .reduce((prev, curr) => prev + curr);
    }
  }
});

module.exports = Die;
