const { Logger } = require('../core/CoreUtils');
const Server = require('../core/Server');


(async function() {
  try {
    Logger.info('Starting the application.');
    let server = new Server();
    await server.start();
  } catch (err) {
    Logger.info('Application failed to start.');
    Logger.info('Exiting.');
    Logger.error(err);
    process.exit(1);
  }
})();
