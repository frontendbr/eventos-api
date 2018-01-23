import Authentication from '../../src/api/auth/Authentication'
import chai from 'chai'
import jwt from 'jsonwebtoken'
import config from 'config'

const should = chai.should()

describe('Authentication', () => {
  context('Generate token', () => {
    it('should validate the token', (done) => {
      const auth = Authentication.createToken('email@email.com.br')
      const request = {
        headers: {},
        query: {
          token: auth.token
        }
      }

      Authentication
        .checkAuth(request)
        .then((result) => {
          result.should.be.contains({ email: 'email@email.com.br' })
          done()
        })
    })

    it('should generate correct token', () => {
      const auth = Authentication.createToken('email@email.com.br')
      const result = jwt.verify(auth.token, config.secret)
      result.should.be.contains({ email: 'email@email.com.br' })
    })

    it('should reject when not have token', (done) => {
      const request = {
        headers: {},
        query: {}
      }

      Authentication
        .checkAuth(request)
        .catch((err) => {
          should.exist(err)
          err.should.be.an.instanceOf(Error).with.property('message', 'É necessário informar um token')
          done()
        })
    })

    it('should reject when token is expired', (done) => {
      const request = {
        headers: {},
        query: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbS5iciIsImlhdCI6MTUxNjcxNTgxNCwiZXhwIjoxNTE2NzE1ODE1fQ.DCB_-4LfqwFBO2GFza07tuzPx4b_zrQy_t8_uQGBQDo'
        }
      }

      Authentication
        .checkAuth(request)
        .catch((err) => {
          should.exist(err)
          err.should.be.an.instanceOf(Error).with.property('message', 'jwt expired')
          done()
        })
    })

    it('should reject when token is invalid', (done) => {
      const request = {
        headers: {},
        query: {
          token: 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbS5iciIsImlhdCI6MTUxNjcxNTgxNCwiZXhwIjoxNTE2NzE1ODE1fQ.DCB_-4LfqwFBO2GFza07tuzPx4b_zrQy_t8_uQGBQDo'
        }
      }

      Authentication
        .checkAuth(request)
        .catch((err) => {
          should.exist(err)
          err.should.be.an.instanceOf(Error).with.property('message', 'invalid token')
          done()
        })
    })
  })
})
