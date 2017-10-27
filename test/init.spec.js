import 'babel-polyfill'
import chai, { assert } from 'chai'
import mocks from './mock-utils'
import path from 'path'

chai.should()

describe('App', () => {
  describe('init', () => {
    it('correct', () => {
      const app = mocks.init(path.join(__dirname, '/../src'), [
        'express',
        'http',
        './database',
        './middleware',
        './middleware/signout-middleware',
        './views',
        './api'
      ])

      mocks.getModule('./database').should.have.been.called
      mocks.getModule('./middleware').should.have.been.called
      mocks.getModule('./middleware/signout-middleware').should.have.been.called
      mocks.getModule('./views').should.have.been.called
      mocks.getModule('./api').should.have.been.called
      assert.isNotNull(app)
    })
  })
})
