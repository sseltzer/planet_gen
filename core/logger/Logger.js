'use strict';

const winston = require('winston');
const logger_levels = require('./logger_levels');
const util = require('util');

class Logger {

  constructor() {
    this.initWinstonOptions();
    this.initLogLevels();
    this.initLogger();
    this.startStream();
    this.initLogFunctions();
    this.logger.info('Logger started.');
    this.times = new Map();
  }

  start() {
    return this;
  }

  initWinstonOptions() {
    winston.emitErrs = true;
  }

  initLogLevels() {
    this.config = {};
    this.config.levels = {};
    this.config.colors = {};

    logger_levels.logLevels.forEach(l => {
      this.config.levels[l.name] = l.level;
      this.config.colors[l.name] = l.color;
    });
    /* istanbul ignore next */
    this.logLevel = process.env.NODE_LOG_LEVEL || 'info';
    winston.addColors(this.config.colors);
  }

  initLogger() {
    this.logger = {};
    this.logger = new winston.Logger({
      transports: [
        new winston.transports.Console({
          level: this.logLevel,
          prettyPrint: true,
          handleExceptions: true,
          json: false,
          colorize: true,
          timestamp: true,
        })
      ],
      exitOnError: false
    });
    this.logger.setLevels(this.config.levels);
  }

  startStream() {
    /* istanbul ignore next */
    module.exports.stream = {
      write: function(message) { //, encoding) {
        this.logger.info(message);
      }
    };
  }

  initLogFunctions() {
    logger_levels.logLevels.forEach(l => {
      this[l.name] = function() {
        try {
          this.logger[l.name].apply(null, arguments);
        } catch(err) {
          this.error('LOGGER FAILED TO LOG OUTPUT');
          this.error(err);
        }
      };
    });
  }

  getCurrentLogLevel() {
    let currentLogLevel = this.config.levels[this.logLevel];
    return {name: this.logLevel, level: currentLogLevel};
  }

  getLogLevel(levelName) {
    let currentLogLevel = this.config.levels[levelName];
    if (!currentLogLevel) return null;
    return {name: levelName, level: currentLogLevel};
  }

  inspect(value, depth = 3) {
    return util.inspect(value, { showHidden: true, colors: true, depth });
  }

  time(label) {
    this.times.set(label, Date.now());
  }

  timeEnd(label) {
    var time = this.times.get(label);
    if (!time) throw new Error('No such label: ' + label);
    var duration = Date.now() - time;
    this.logger.info('%s: %dms', label, duration);
  }
}

class LoggerSingleton {
  static getInstance() {
    if (!LoggerSingleton.instance) LoggerSingleton.instance = new Logger();
    return LoggerSingleton.instance;
  }
}

module.exports = LoggerSingleton;
