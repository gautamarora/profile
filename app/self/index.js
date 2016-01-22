var core = require('@gautamarora/core');
var header = require('@gautamarora/header');

module.exports.init = function (app, express) {
  console.log('profile self init');
  core.registerRoutes(__dirname, 'routes', app, express); //express routes
  core.registerPartials(__dirname, 'partials', 'profile'); //handlebars partials
  header.setInitialState({"sidebar": {"component": "profile", "name": "profile","url":"/profile"}});
};