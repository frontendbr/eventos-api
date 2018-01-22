import supertest from 'supertest'
import config from 'config'

class TestUtils {
  constructor () {
    this.config = config
  }
  requestApi (path = '') {
    return supertest(`http://localhost:${this.config.port}/api/${path}`)
  }

  endTest (done, err) {
    if (err) {
      throw err
    } else {
      done()
    }
  }
}

export default new TestUtils()
