import chai from 'chai'
import sinonChai from 'sinon-chai'

chai.should()
chai.use(sinonChai)

const processor = require('../../src/database/admin-processor')

describe('Give a snapshot', () => {
  it('should return a array', () => {
    const admin = (email) => {
      return {
        val: () => email,
        key: 0
      }
    }

    const snapshot = [admin('a@t.com'), admin('b@t.com')]
    const list = processor.process({
      snapshot
    })
    list.should.be.lengthOf(2)
  })
})
