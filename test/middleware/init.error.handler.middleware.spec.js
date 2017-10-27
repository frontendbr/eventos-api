import sinon from 'sinon'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import mocks from '../mock-utils'

const assert = chai.assert
chai.should()
chai.use(sinonChai)

describe('Error Handler Middleware', () => {
  let middleware

  describe('init', () => {
    let app
    it('correct', () => {
      const error = mocks.init('../../src/middleware/error-handler-middleware', [])

      app = mocks.getModule('express')()
      const useApp = sinon.stub(app, 'use')

      const db = mocks.getModule('./database')

      assert.isNotNull(error({
        app,
        db
      }))
      useApp.should.have.been.called
    })

    after(function () {
      app.use.restore()
    })
  })

  describe('should call the use', () => {
    it('for validation', () => {
      const error = mocks.init('../../src/middleware/error-handler-middleware', [])
      const next = {}
      const expressValidation = require('express-validation')
      const app = {
        use: function (next) {
          middleware = next
        }
      }

      error({
        app
      })

      const errors = {}
      const options = {
        status: 400
      }
      const errorThrow = new expressValidation.ValidationError(errors, options)
      const req = {}
      const res = {
        status: () => {}
      }

      const status = sinon.stub(res, 'status').returns({
        json: () => {}
      })

      // simulando a chamada do middleware
      middleware(errorThrow, req, res, next)
      status.should.have.been.calledWith(400)
    })

    it('for error commom', () => {
      const error = mocks.init('../../src/middleware/error-handler-middleware', [])
      const next = {}
      const app = {
        use: function (next) {
          middleware = next
        }
      }

      error({
        app
      })

      const errorThrow = {
        status: 400,
        message: 'Error'
      }
      const req = {}
      const res = {
        status: () => {}
      }

      const status = sinon.stub(res, 'status').returns({
        json: () => {}
      })

      // simulando a chamada do middleware
      middleware(errorThrow, req, res, next)
      status.should.have.been.calledWith(500)
    })
  })
})
