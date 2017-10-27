import express from './express'
import sinon from 'sinon'
import firebasemock from 'firebase-mock'
import { assert } from 'chai'
import { noCallThru } from 'proxyquire'

const proxyquireStrict = noCallThru()
const database = sinon.spy((next) => {
  assert.isNotNull(next)
  assert.isFunction(next)
  next({})
})

const http = {
  createServer: () => { }
}

let mockdatabase = new firebasemock.MockFirebase()
let mockauth = new firebasemock.MockFirebase()
let firebase = firebasemock.MockFirebaseSdk(function (path) {
  return mockdatabase.child(path)
}, function () {
  return mockauth
})

sinon.stub(firebase, 'initializeApp').returns(() => { })
sinon.stub(firebase, 'database')
  .returns({
    ref: () => {
      return {
        push: () => {
          return new Promise((resolve, reject) => {
            resolve({})
          })
        }
      }
    }
  })
sinon.stub(firebase, 'auth')
  .returns({
    signOut: () => { },
    signInWithCredential: () => { }
  })

const firebaseAdmin = {
  initializeApp: () => { },
  credential: {
    cert: () => { }
  }
}

sinon.stub(firebaseAdmin, 'initializeApp')

const ht = sinon.stub(http, 'createServer')

ht.returns({
  listen: (port, next) => {
    next()
  },
  address: () => {
    return {
      port: 8080
    }
  }
})

const middleware = sinon.spy(() => { })
const defaultMiddleware = sinon.spy(() => { })
const passportMiddleware = sinon.spy(() => { })
const signout = sinon.spy(() => { })
const views = sinon.spy(() => { })
const api = sinon.spy(() => { })

const store = {}
store['http'] = http
store['express'] = express
store['./database'] = database
store['./middleware'] = middleware
store['./views'] = views
store['./api'] = api
store['./middleware/signout-middleware'] = signout
store['./default-middleware-application'] = defaultMiddleware
store['./passport-middleware'] = passportMiddleware
store['firebase'] = firebase
store['firebase-admin'] = firebaseAdmin

function init (pathModule, modules) {
  const initialize = {}
  for (let i = 0; i < modules.length; i++) {
    initialize[modules[i]] = store[modules[i]]
  }
  return proxyquireStrict(pathModule, initialize)
}

function getModule (moduleName) {
  return store[moduleName]
}

module.exports = {
  init,
  getModule
}
