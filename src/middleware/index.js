import { Router } from 'express'
import defaultMiddleware from './default-middleware-application'

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

  return routes
}
