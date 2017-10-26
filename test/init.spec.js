const chai = require('chai')
const assert = chai.assert
const mocks = require('./mock-utils')
const path = require('path')

chai.should()

describe('App', () => {
  describe('init', () => {
    it('correct', () => {
      const app = mocks.init(path.join(__dirname, '/../src'), ['express',
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
