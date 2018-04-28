'use strict';
const { Logger } = require('../../core/CoreUtils');
const Dice = require('../../app/utilities/Dice');
const SystemGenerator = require('../../app/core/SystemGenerator');
class DebugDiceRoutes {

  constructor(server) {
    Logger.trace('DebugDiceRoutes : constructor');
    this.server = server;
    this.seed = `${Math.random()}`;
    this.dice = new Dice(this.seed);
    this.sg = new SystemGenerator();
  }
  register(router) {
    Logger.trace('DebugDiceRoutes : register');
    router.get('/debug/roll', this.roll.bind(this));
    router.get('/debug/generate', this.generate.bind(this));
    return router;
  }
  roll(req, res, next) {
    res.send({
      'roll': this.dice.roll().three().d6()
    });
  }

  generate(req, res, next) {
    res.send(this.sg.generate());
  }
}

module.exports = DebugDiceRoutes;
