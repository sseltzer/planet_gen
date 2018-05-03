const { Logger } = require('../../core/CoreUtils');
const Dice  = require('../utilities/Dice');
const SystemConfig = require('../configs/System.config.json');

class SystemGenerator {

  constructor(seed) {
    this.seed = seed || SystemConfig.seed || `${Math.random()}`;
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
    };
  }

  generateStars() {
    let rolls = this.rollSystemConfig();

    let metadata = this.generateSystemMetadata(rolls.rollBodiesMain);
    let stars = [];
    for (var i = 0; i < metadata.count; i++) {
      if (i === 0) stars.push(this.generatePrimary(rolls.rollPrimaryMain, rolls.rollPrimarySub));
      else stars.push(this.generateSecondary(rolls.rollPrimaryMain));
    }
    let system = {
      type: metadata.type,
      stars,
    };
    if (SystemConfig.debug) system.rollBodiesMain = rolls.rollBodiesMain;

    return system;
  }

  rollSystemConfig(test) {
    if (!test) return {
      rollBodiesMain:    this.dice.roll(SystemConfig.rolls.system.bodies.main),
      rollPrimaryMain:   this.dice.roll(SystemConfig.rolls.system.primary.main),
      rollPrimarySub:    this.dice.roll(SystemConfig.rolls.system.primary.sub)
    };
    return {
      rollBodiesMain:    16,
      rollPrimaryMain:   11,
      rollPrimarySub:    5
    };
  }

  generateSystemMetadata(rollBodiesMain) {
    let count = SystemConfig.taxonomy.system.bodies.default.count;
    let type = SystemConfig.taxonomy.system.bodies.default.type;
    let types = SystemConfig.taxonomy.system.bodies.types;
    types.map(t => {
      if (rollBodiesMain >= t.min && rollBodiesMain < t.max) {
        count = t.count;
        type = t.type;
      }
    });
    return {type, count};
  }
  generatePrimary(rollPrimaryMain, rollPrimarySub) {
    let star = this.generateStarType(rollPrimaryMain, rollPrimarySub);
    if (SystemConfig.debug) {
      star.rollPrimaryMain = rollPrimaryMain;
      star.rollPrimarySub = rollPrimarySub;
      Logger.debug(`created new [${star.name}] star`);
    }
    return star;
  }
  generateSecondary(rollPrimaryMain) {
    let rollSecondaryMain = this.dice.roll(SystemConfig.rolls.system.secondary.main);
    let rollSecondaryCalculated = rollPrimaryMain + rollSecondaryMain - 1;
    let star = this.generateStarType(rollSecondaryCalculated);
    let starOrbitRoll = this.dice.roll(SystemConfig.rolls.system.orbit.main);
    star.orbit = this.generateStarOrbit(starOrbitRoll);
    if (SystemConfig.debug) {
      star.rollPrimaryMain = rollPrimaryMain;
      star.rollSecondaryMain = rollSecondaryMain;
      star.rollSecondaryCalculated = rollSecondaryCalculated;
      star.starOrbitRoll = starOrbitRoll;
      Logger.debug('rollPrimary');
    }
    return star;
  }
  generateStarType(rollMain, rollSub) {
    let name = SystemConfig.taxonomy.stars.default.name;
    let sequence = SystemConfig.taxonomy.stars.default.sequence;

    let types = SystemConfig.taxonomy.stars.types;
    types.map(t => {
      if (rollMain >= t.min && rollMain < t.max) {
        if (t.hasOwnProperty('subroll_min') && t.hasOwnProperty('subroll_max')) {
          if (rollSub >= t.subroll_min && rollSub < t.subroll_max) {
            name = t.name;
            sequence = t.sequence;
          }
        } else {
          name = t.name;
          sequence = t.sequence;
        }
      }
    });
    return {
      name,
      sequence
    };
  }

  generateStarOrbit(rollMain) {
    const orbitTypes = SystemConfig.taxonomy.stars.orbits;
    let type = SystemConfig.taxonomy.stars.default.orbit;

    orbitTypes.map(t => {
      if (rollMain >= t.min && rollMain < t.max) {
        type = t.type;
      }
    });

    return type;
  }
}

module.exports = SystemGenerator;
