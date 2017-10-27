import { Router } from 'express'
import defaultMiddleware from './default-middleware-application'
import passportMiddleware from './passport-middleware'

module.exports = ({
  config,
  db,
  app
}) => {
  console.info('Init Middleware module')

  const routes = Router()

  defaultMiddleware({
    config,
    app
  })

  routes.use(passportMiddleware({
    config,
    db
  }))

  return routes
}
