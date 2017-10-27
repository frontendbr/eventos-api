'use strict'
exports = module.exports = () => obj
exports.application = () => {}
exports.request = () => {}
exports.response = () => {}
exports.Route = () => {}

exports.query = () => {}
exports.static = () => {}

// methods for mock
let capture = []

exports.initCapture = () => {
  console.log('init')
  capture = []
}

exports.stopCapture = () => {
  capture = []
}

exports.captures = () => {
  return capture
}

const _capture = () => {
  // if (!this.capture) this.capture = []
  let capture = []
  capture.push(arguments)
}

class Router {
  constructor () {
    this.capture = []
  }

  use () {
    if (!this.capture) this.capture = []
    this.capture.push(arguments)
  }

  post () {
    if (!this.capture) this.capture = []
    this.capture.push(arguments)
  }

  get () {
    if (!this.capture) this.capture = []
    this.capture.push(arguments)
  }

  put () {
    if (!this.capture) this.capture = []
    this.capture.push(arguments)
  }

  delete () {
    if (!this.capture) this.capture = []
    this.capture.push(arguments)
  }
  captur () {
    return this.capture
  }
}

exports.Router = () => new Router()
const obj = {}
obj.use = _capture
obj.get = _capture
obj.post = _capture
obj.put = _capture
