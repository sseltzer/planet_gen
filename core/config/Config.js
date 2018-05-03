const path = require('path');
const Logger = require('../logger/Logger').getInstance();
const dotenv_ext = require('dotenv-extended');

const defaultOptions = {
  path: 'config/env/loc.env',
  schema: 'config/env/schema.env',
  errorOnMissing: true,
  errorOnExtra: true,
  consts: {}
};

class Config {

  constructor() {
    this.env = {};
    this.consts = {};
  }

  load(options = {}) {
    let opts = Object.assign({}, defaultOptions, options);
    this.initializeConfig(opts);
    this.initializeConsts(opts);
    return this;
  }

  initializeConfig(opts) {
    try {
      let envPath = opts.path;
      if (envPath && !envPath.startsWith('/')) envPath = path.join(__dirname, '../../', opts.path);
      require.resolve(envPath);
    } catch (err) {
      Logger.warn(`Could not resolve your specified env file at ${opts.path}.`);
      Logger.warn('If this is the first time you\'re loading, please clone schema.env into that path and fill in your desired values.');
    }
    dotenv_ext.load({
      path: opts.path,
      schema: opts.schema,
      errorOnMissing: opts.errorOnMissing,
      errorOnExtra: opts.errorOnExtra
    });
    this.env = process.env;
  }

  initializeConsts(opts) {
    this.consts = opts.consts;
  }
}

class ConfigSingleton {
  static getInstance() {
    if (!ConfigSingleton.instance) ConfigSingleton.instance = new Config();
    return ConfigSingleton.instance;
  }
}

module.exports = ConfigSingleton;
