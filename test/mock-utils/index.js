const proxyquireStrict = require('proxyquire').noCallThru();
const sinon = require('sinon');
const { assert } = require('chai');

const database = sinon.spy(( callback ) => {
    assert.isNotNull(callback);
    assert.isFunction(callback);
    callback({});
});

const express = sinon.spy(() => {
  return {
    use: () => { },
    use: () => { },
    get: () => { }
  };
});

const http = {
  createServer: () => {}
};

const ht = sinon.stub(http, 'createServer');

ht.returns({
  listen: ()=> {}
});

const middleware = sinon.spy(()=>{});

const views = sinon.spy(()=>{});

const api = sinon.spy(()=>{});

function init(pathModule, modules){
  const initialize = {};
  for(let i=0; i< modules.length; i++ ){
      initialize[modules[i]] = store[modules[i]];
  }
  
  proxyquireStrict(pathModule, initialize);
}

const store = {};
store['http'] = http;
store['express'] = express;
store['./database'] = database;
store['./middleware'] = middleware;
store['./views'] = views;
store['./api'] = api;

module.exports = {
  init
}
