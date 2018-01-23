import TestUtil from '../TestUtil'
import Authentication from '../../src/api/auth/Authentication'

describe('Admin', () => {
  const request = TestUtil.requestApi('admin')
  let token
  before(() => {
    token = Authentication.createToken('teste@testando.com').token
  })

  context('Get /', () => {
    it('should return only the admin registred', (done) => {
      const returnExpected = {
        'status': true,
        'data': [
          {
            '_id': '200000000000000000000002',
            'email': 'teste@testando.com',
            '__v': 0
          }
        ]
      }

      request.get('/')
        .set('authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200, returnExpected)
        .end(TestUtil.endTest.bind(null, done))
    })
  })

  context('Post /', () => {
    it('should persist the new admin', (done) => {
      const admin = {
        email: 'admin@admin.com.br'
      }

      request.post('/')
        .send(admin)
        .set('authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(TestUtil.endTest.bind(null, done))
    })

    it('should return error when new admin not have email', (done) => {
      const admin = {
      }

      request.post('/')
        .send(admin)
        .set('authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(500)
        .end(TestUtil.endTest.bind(null, done))
    })
  })

  context('Delete /:id', () => {
    it('should delete the admin', (done) => {
      request
        .del('/200000000000000000000001')
        .set('authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(TestUtil.endTest.bind(null, done))
    })

    it('should return error on delete admin with id invalid', (done) => {
      request
        .del('/1234')
        .set('authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(500)
        .end(TestUtil.endTest.bind(null, done))
    })
  })
})
