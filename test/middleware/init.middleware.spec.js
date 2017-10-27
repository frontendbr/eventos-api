import sinon from 'sinon'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import path from 'path'
import mocks from '../mock-utils'

const assert = chai.assert
chai.should()
chai.use(sinonChai)

describe('Middleware', () => {
  describe('init', () => {
    it('correct', () => {
      const router = sinon.stub(mocks.getModule('express'), 'Router')
      router.returns(mocks.getModule('express')())

      const middleware = mocks.init(path.join(__dirname, '/../../src/middleware/'), ['express',
        './default-middleware-application',
        './passport-middleware'
      ])

      assert.isNotNull(middleware({}))
      router.should.have.been.called
      mocks.getModule('./passport-middleware').should.have.been.called
      mocks.getModule('./default-middleware-application').should.have.been.called
    })
  })
})
