var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'ch5'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/ch5-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'ch5'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/ch5-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'ch5'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/ch5-production'
  }
};

module.exports = config[env];
