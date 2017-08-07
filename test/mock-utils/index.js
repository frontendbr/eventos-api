const proxyquireStrict = require('proxyquire').noCallThru();
const sinon = require('sinon');
const firebasemock = require('firebase-mock');
const { assert } = require('chai');

const database = sinon.spy((callback) => {
  assert.isNotNull(callback);
  assert.isFunction(callback);
  callback({});
});

const express = require('./express');

const http = {
  createServer: () => { }
};

var mockdatabase = new firebasemock.MockFirebase();
var mockauth = new firebasemock.MockFirebase();
var firebase = firebasemock.MockFirebaseSdk(function (path) {
  return mockdatabase.child(path);
}, function () {
  return mockauth;
});


sinon.stub(firebase, 'initializeApp').returns(() => { });
sinon.stub(firebase, 'database')
  .returns({ ref: () => { return { push: () => { } } } });
sinon.stub(firebase, 'auth')
  .returns({ signOut: () => { }, signInWithCredential: () => { } });

const firebaseAdmin = { initializeApp: () => { }, credential: { cert: () => { } } };

sinon.stub(firebaseAdmin, 'initializeApp');

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
//store['express-router'] = express;
store['firebase'] = firebase;
store['firebase-admin'] = firebaseAdmin;


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
