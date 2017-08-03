const proxyquireStrict = require('proxyquire').noCallThru();
const sinon = require('sinon');
const { assert } = require('chai');

const database = sinon.spy((callback) => {
  assert.isNotNull(callback);
  assert.isFunction(callback);
  callback({});
});

const express = require('./express');

ex = sinon.stub(express, 'Router');
ex.returns({
  use: () => { }
});
const http = {
  createServer: () => { }
};

const ht = sinon.stub(http, 'createServer');

ht.returns({
  listen: (port, callback) => {
    callback();
  },
  address: () => {
    return {
      port: 8080
    }
  }
});

const middleware = sinon.spy(() => { });
const defaultMiddleware = sinon.spy(() => { });
const passportMiddleware = sinon.spy(() => { });
const signout = sinon.spy(() => { });
const views = sinon.spy(() => { });
const api = sinon.spy(() => { });

const store = {};
store['http'] = http;
store['express'] = express;
store['./database'] = database;
store['./middleware'] = middleware;
store['./views'] = views;
store['./api'] = api;
store['./middleware/signout-middleware'] = signout;
store['./default-middleware-application'] = defaultMiddleware;
store['./passport-middleware'] = passportMiddleware;
store['express-router'] = ex;

function init(pathModule, modules) {
  const initialize = {};
  for (let i = 0; i < modules.length; i++) {
    initialize[modules[i]] = store[modules[i]];
  }
  return proxyquireStrict(pathModule, initialize);
}

function getModule(moduleName) {
  return store[moduleName];
}

module.exports = {
  init,
  getModule
}
