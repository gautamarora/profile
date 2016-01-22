var core = require('core');
var header = require('header');
var self = require('./self');

module.exports.init = function() {
  core.init();
  header.init();
  self.init();
}();