const { Logger } = require("../../core/CoreUtils");
const { dice } = require("../utilities/dice/Dice");

class SystemGenerator {
  constructor() {}

  generate() {
    let star = this.generateStars();
    return {
      star,
      random: {
        seed: dice.seed,
        state: dice.saveable
      }
    };
  }

  generateStars() {
    let roll = dice
      .roll()
      .three()
      .d6();
    let star = {
      type: "Solitary",
      count: 1,
      roll
    };
    if (roll > 10) {
      star.type = "Binary";
      star.count = 2;
    }
    if (roll > 15) {
      star.type = "Trinary";
      star.count = 3;
    }
    return star;
  }
}

module.exports = SystemGenerator;
