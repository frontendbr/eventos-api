import { version } from '../../package.json'
import { Router } from 'express'
import loginMiddleware from '../middleware/login-request-middleware'
import Docs from './docs'
import Events from './events'
import Admin from './admin'
import Menu from './menu'

module.exports = ({
  config,
  db
}) => {
  console.info('Init API module')
  const loginManager = loginMiddleware({
    config,
    db
  })

  let api = Router()

  api.use(Docs({
    config,
    db
  }))
  api.use(Events(loginManager))
  api.use(Admin({
    config,
    db,
    loginManager
  }))
  api.use(Menu({
    config,
    db,
    loginManager
  }))

  api.get('/', (req, res, next) => {
    res.json({
      version
    })
    next()
  })

  return api
}
