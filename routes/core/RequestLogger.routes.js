'use strict';
const { Logger } = require('../../core/CoreUtils');

class RequestLoggerRoutes {

  constructor(server) {
    Logger.trace('RequestLoggerRoutes : constructor');
    this.server = server;
  }
  register(router) {
    Logger.trace('RequestLoggerRoutes : register');
    this.server.app.use(this.captureRequest.bind(this));
    return router;
  }
  captureRequest(req, res, next) {
    Logger.trace('RequestLoggerRoutes : captureRequest');
    Logger.info(`REQ GLOBAL - ${req.method} ${req.url} ${JSON.stringify(req.params)} ${JSON.stringify(req.query)}`);
    next();
  }
}

module.exports = RequestLoggerRoutes;
