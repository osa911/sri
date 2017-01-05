'use strict';

var path = require('path'),
    config;

config = {
  production: {},
  development: {
    api: {
      public_cbr: 'http://cbr.ru/scripts/XML_daily.asp',
    }
  }
};

module.exports = config;
