import TestUtil from '../TestUtil'

describe('Version api', () => {
  context('GET /', () => {
    it('should return the correct version', (done) => {
      const request = TestUtil.requestApi()

      request
        .get('')
        .expect('Content-Type', /json/)
        .expect(200, { 'version': '1.0.0' })
        .end(TestUtil.endTest.bind(null, done))
    })
  })
})
