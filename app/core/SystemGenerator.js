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
      else stars.push(this.generateSecondary(rolls.rollPrimaryMain, rolls.rollSecondaryMain));
    }
    this.initCompanions(stars, rolls.rollOrbitOne, rolls.rollOrbitTwo);
    let system = {
      type: metadata.type,
      stars,
    };
    if (SystemConfig.debug) system.rollBodiesMain = rolls.rollBodiesMain;
    if (SystemConfig.debug) system.rollOrbitMain = rolls.rollOrbitMain;
    
    return system;
  }

  initCompanions(stars, rollOrbitOne, rollOrbitTwo) {
    if (stars.length <= 1) return null;
    stars[0].companions = [];
    const orbitTypes = SystemConfig.taxonomy.stars.orbits;
    let orbits = [
      {companion: stars[1]}
    ];
    if (stars[2]) orbits.push({companion: stars[2]});
    orbitTypes.map( o => {
      if (rollOrbitOne >= o.min && rollOrbitOne <= o.max) {
        orbits[0].type = o.type;
        if (SystemConfig.debug) Logger.debug('Adding companion orbit of ' + o.type);
      }
      if (!!stars[2] && (rollOrbitTwo >= o.min && rollOrbitTwo <= o.max)) {
        orbits[1].type = o.type;
      }
    });
    stars[0].companions = [...stars[0].companions, ...orbits];
  }
  rollSystemConfig(test) {
    if (!test) return {
      rollBodiesMain:    this.dice.roll(SystemConfig.rolls.system.bodies.main),
      rollPrimaryMain:   this.dice.roll(SystemConfig.rolls.system.primary.main),
      rollPrimarySub:    this.dice.roll(SystemConfig.rolls.system.primary.sub),
      rollSecondaryMain: this.dice.roll(SystemConfig.rolls.system.secondary.main),
      rollOrbitOne: this.dice.roll(SystemConfig.rolls.system.orbit.main),
      rollOrbitTwo: this.dice.roll(SystemConfig.rolls.system.orbit.main)
      
    };
    return {
      rollBodiesMain:    11,
      rollPrimaryMain:   2,
      rollPrimarySub:    6,
      rollSecondaryMain: 5
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
  generateSecondary(rollPrimaryMain, rollSecondaryMain) {
    let rollSecondaryCalculated = rollPrimaryMain + rollSecondaryMain - 1;
    let star = this.generateStarType(rollSecondaryMain);
    if (SystemConfig.debug) {
      star.rollPrimaryMain = rollPrimaryMain;
      star.rollSecondaryMain = rollSecondaryMain;
      star.rollSecondaryCalculated = rollSecondaryCalculated;
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
}

module.exports = SystemGenerator;
