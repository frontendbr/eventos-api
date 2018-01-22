import TestUtil from '../TestUtil'

describe('Admin', () => {
  const request = TestUtil.requestApi('admin')

  context('Post /', () => {
    it('should persist the new admin', (done) => {
      const admin = {
        email: 'admin@admin.com.br'
      }

      request.post('/')
        .send(admin)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(TestUtil.endTest.bind(null, done))
    })

    it('should return error when new admin not have email', (done) => {
      const admin = {
      }

      request.post('/')
        .send(admin)
        .expect('Content-Type', /json/)
        .expect(500)
        .end(TestUtil.endTest.bind(null, done))
    })
  })
})
