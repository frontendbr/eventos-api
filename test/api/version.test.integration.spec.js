import supertest from 'supertest'
import config from 'config'

describe('Version api', () => {
  it('should return the correct version', (done) => {
    const request = supertest(`http://localhost:${config.port}/api`)

    request.get('/')
      .expect('Content-Type', /json/)
      .expect(200, { 'version': '1.0.0' })
      .end(done)
  })
})
