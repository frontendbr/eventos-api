import chai from 'chai'
import sinonChai from 'sinon-chai'
import mocks from '../mock-utils'

const assert = chai.assert
chai.should()
chai.use(sinonChai)

describe('Database', () => {
  let dbInit

  beforeEach(() => {
    dbInit = mocks.init('../../src/database', ['firebase'])
  })

  describe('init', () => {
    it('correct', () => {
      assert.isFunction(dbInit)

      dbInit((db) => {
        assert.isNotNull(db)
        assert.isFunction(db.signOut)
        assert.isFunction(db.saveEvent)
      })
    })
  })
  describe('firebase', () => {
    it('signOut', () => {
      dbInit((db) => {
        db.signOut()
        mocks.getModule('firebase').auth.should.have.been.called
      })
    })

    it('saveEvent', () => {
      dbInit((db) => {
        db.saveEvent()
        mocks.getModule('firebase').database.should.have.been.called
      })
    })
  })
})
