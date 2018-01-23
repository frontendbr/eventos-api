import jwt from 'jsonwebtoken'
import config from 'config'
import Administrator from '../admin/model'

export class Authentication {
  constructor () {
    this.config = config
    this.jwt = jwt
  }

  checkAuth (request) {
    return this._validToken(request)
  }

  checkAdmin (request) {
    return this._validToken(request)
      .then((user) => {
        return Administrator
          .findOne({ email: user.email })
          .exec()
      }).then((adm) => {
        if (!adm) {
          return Promise.reject(new Error('É necessário ser adm'))
        }
        return adm
      })
  }

  _validToken (request) {
    return new Promise((resolve, reject) => {
      const jwtToken = this._getToken(request)
      if (!jwtToken) {
        reject(new Error('É necessário informar um token'))
      }
      const userInfo = this.jwt.verify(jwtToken, this.config.secret)

      if (!userInfo) {
        reject(new Error('É necessário estar logado'))
      }

      resolve(userInfo)
    })
  }

  createToken (email) {
    return { token: this.jwt.sign({ email }, this.config.secret, { expiresIn: this.config.expiresIn }) }
  }

  _getToken (request) {
    const query = request.query
    const headers = request.headers

    let token = null

    const bearerHeader = headers.authorization
    if (bearerHeader && bearerHeader.indexOf(' ') > -1) {
      token = bearerHeader.split(' ')[1]
    }

    if (!token && query.token) {
      token = query.token
    }

    return token
  }
}

export default new Authentication()
