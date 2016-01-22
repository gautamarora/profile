var core = require('@gautamarora/core');
var $ = core.$;
var globalBus = core.globalBus;
var localBus = require('../../utils/local-bus');

module.exports.init = function() {
  if(!window.microapps.profile) return false;
  console.log('profile self init');
};