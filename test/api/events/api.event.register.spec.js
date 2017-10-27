import sinon from 'sinon'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import mocks from '../../mock-utils'

chai.should()
chai.use(sinonChai)

describe('Event', () => {
  describe('need call middleware', () => {
    let eventRegister
    beforeEach(() => {
      eventRegister = mocks.init('../../src/api/events', ['express'])
      mocks.getModule('express').initCapture()
    })

    afterEach(() => {
      mocks.getModule('express').stopCapture()
    })

    it('loginManager', () => {
      const loginManager = {
        authentication: () => {}
      }
      sinon.stub(loginManager, 'authentication')

      const router = eventRegister({
        loginManager
      })

      // simulando chamada do middleware
      router.captur()[0][2]()

      loginManager.authentication.should.have.been.called
    })

    it('route with success', () => {
      const loginManager = {
        authentication: () => {}
      }
      const db = {
        saveEvent: () => {}
      }
      sinon.stub(db, 'saveEvent').returns(new Promise((resolve, reject) => {
        resolve({})
      }))

      const req = {
        body: {
          location: {}
        }
      }
      const res = {
        status: () => {}
      }
      const next = () => {}
      const router = eventRegister({
        loginManager,
        db
      })

      // simulando chamada do middleware
      router.captur()[0][3](req, res, next)

      db.saveEvent.should.have.been.called
    })
  })
})
