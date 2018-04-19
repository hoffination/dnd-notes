'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROUTER_BASE: '/',
  API: '"https://vffebp5l65.execute-api.us-east-1.amazonaws.com/dev"',
});
