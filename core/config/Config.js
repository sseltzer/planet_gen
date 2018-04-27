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
