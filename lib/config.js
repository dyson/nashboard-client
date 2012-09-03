var config = require('nconf');

env = (process.env.NODE_ENV || 'development');

config.argv(    {
    'config': {
      default: './config/' + env + '.json'
    },
    'checks-config': {
      default: './config/checks-' + env + '.json'
    }
  })
  .env();

config.file({file: config.get('config')});
config.file('checks', {file: config.get('checks-config')});

module.exports = config
