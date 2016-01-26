var pkg = require('../../../package');
var db = require('../../db');

var core = require('@gautamarora/core');
var header = require('@gautamarora/header');

var microapps = ['core', 'header'];

//pre-processing of the raw data based on the io response
function processData(req, res, cb) {
  res.data.profile = {};
  res.data.profile = res.data.db;
  cb(null, 'profile', req, res);
}

function mergeData(err, microapp, req, res) {
  if(Object.keys(res.data).length === microapps.length + 2) { //+1 for self, +1 for db in the data map
    processMergedData(req, res);
  }
}

//post-processing when you have data from all the modules
function processMergedData(req, res) {
  sendResponse(req, res);
}

function sendResponse(req, res) {
  core.renderTemplate(__dirname, 'profile', res.data, function (err, html) {
    if (err) return next(err);
    return res.send(html);
  });
}

module.exports = function(app) {
  //get package info
  app.get('/info/profile', function(req, res) {
    res.send({
      name: pkg.name,
      version: pkg.version,
      process: {
        title: process.title,
        pid: process.pid,
        version: process.version,
        arch: process.arch,
        platform: process.platform,
        memory: process.memoryUsage()
      },
      env: {
        NODE_ENV: process.env.NODE_ENV
      }
    });
  });
  
  app.get('/profile', function getData(req, res) {
    res.data = {};
    db.getAll('profile', function(err, data) {
      res.data.db = data;
      processData(req, res, mergeData);
      core.processData('profile', req, res, mergeData);
      header.processData('profile', req, res, mergeData);
    });
  });
};