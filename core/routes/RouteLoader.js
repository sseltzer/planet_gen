const path = require('path');
// const { Logger } = require('../CoreUtils');
const { routes } = require('../../routes/routes.json');

class RouteLoader {
  static load(server) {
    routes.map(r => {
      const route = require(path.join(__dirname, '../../', r));
      server.app.use('/', new route(server).register(server.router));
    });
  }
}

module.exports = RouteLoader;
