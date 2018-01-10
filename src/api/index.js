import { version } from '../../package.json'
import { Router } from 'express'
import loginMiddleware from '../middleware/login-request-middleware'
import Docs from './docs'
import Events from './events'
import Admin from './admin'

const router = ({
  config,
  db
}) => {
  console.info('Init API module')
  const loginManager = loginMiddleware({
    config,
    db
  })

  const api = Router()

  api.use('/admin', Admin(loginManager))
  api.use('/event', Events(loginManager))

  api.use(Docs({
    config,
    db
  }))

  api.use(Admin({
    config,
    db,
    loginManager
  }))

  api.use(Events(loginManager))

  api.get('/', (req, res, next) => {
    res.json({
      version
    })
    next()
  })

  return api
}

export default router
