const { Logger } = require('../../core/CoreUtils');
const Dice = require('../utilities/Dice');

class SystemGenerator {

  constructor() {
    this.seed = `${Math.random()}`;
    this.dice = new Dice(this.seed);
  }

  generate() {
    let stars = this.generateStars();
    return {
      stars,
      random: {
        seed: this.dice.seed,
        state: this.dice.saveable
      }
    }
  }

  generateStars() {
    let roll = this.dice.roll().three().d6();
    let primaryRoll = this.dice.roll().two().d6();
    let stars = [this.generatePrimary(primaryRoll)];
    if (roll > 10) stars.push(this.generateSecondary(primaryRoll));
    if (roll > 15) stars.push(this.generateSecondary(primaryRoll));
    return this.generateSystemClass(stars);
  }

  generatePrimary(primaryRoll) {
    let subRoll = this.dice.roll().d6();
    return { type: this.generateStarType(primaryRoll, subRoll), roll: primaryRoll, subRoll };
  }
  generateSecondary(primaryRoll) {
    let secondaryRoll = primaryRoll + (this.dice.roll().two().d6() - 1);
    return { type: this.generateStarType(secondaryRoll), roll: secondaryRoll };
  }
  generateStarType(roll, subRoll) {
    let type = '';
    if (roll <= 2) {
      if (subRoll <= 2) type = 'O';
      else if (subRoll <= 4) type = 'B';
      else type = 'A';
    }
    if (roll === 3) type = 'F';
    if (roll === 4) type = 'G';
    if (roll === 5) type = 'K';
    if (roll >=6 && roll < 14) type = 'M';
    if (roll >= 14) type = 'L';
    return type;
  }

  generateStarMetadata(star) {
    switch(star.type) {
      case 'O':
      case 'B':
      case 'A':
        star.commonName = 'Blue';
        break;
      case 'F':
        star.commonName = 'Blue / White';
        break;
      case 'G':
        star.commonName = 'White / Yellow';
        break;
      case 'K':
        star.commonName = 'Orange / Red';
        break;
      case 'M':
        star.commonName = 'Red Dwarf';
        break;
      case 'L':
        star.commonName = 'Brown Dwarf';
        break;
      default:
        break;
    }
  }

  generateSystemClass(stars) {
    let type = 'Void';
    if (stars.length === 1) type = 'Solitary';
    if (stars.length === 2) type = 'Binary';
    if (stars.length === 3) type = 'Trinary';
    if (stars.length > 3) type = 'Multi-Body';
    stars.map(s => this.generateStarMetadata(s));
    return {
      type,
      stars
    };
  }

}

module.exports = SystemGenerator;
