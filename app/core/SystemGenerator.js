const { Logger } = require("../../core/CoreUtils");
const Dice = require("../utilities/Dice");

class SystemGenerator {
  constructor() {
    this.seed = `${Math.random()}`;
    this.dice = Dice({ seed: this.seed });
  }

  generate() {
    let star = this.generateStars();
    return {
      star,
      random: {
        seed: this.dice.seed,
        state: this.dice.saveable
      }
    };
  }

  generateStars() {
    let roll = this.dice
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
