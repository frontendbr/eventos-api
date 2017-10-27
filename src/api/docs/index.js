import { Router } from 'express'
import swaggerDocument from './swagger.json'
import swaggerUi from 'swagger-ui-express'

module.exports = ({
  config,
  db
}) => {
  console.info('Init DOCS API module')
  const app = Router()
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  return app
}
