'use strict';
const { Logger } = require('../../core/CoreUtils');

class HealthCheckRoutes {

  constructor(server) {
    Logger.trace('HealthCheckRoutes : constructor');
    this.server = server;
  }

  register(router) {
    Logger.trace('HealthCheckRoutes : register');
    router.get('/health', this.checkHealth.bind(this));
    return router;
  }

  async checkHealth(req, res) {
    Logger.trace('HealthCheckRoutes : checkHealth');
    let health = {
      application: {
        ready: true
      }
    };
    if (health && health.application && !health.application.ready) res = res.status(500);
    res.send(health);
  }
}

module.exports = HealthCheckRoutes;
