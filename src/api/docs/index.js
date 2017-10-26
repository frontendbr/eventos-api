const {
  Router
} = require('express')
const swaggerDocument = require('./swagger.json')
const swaggerUi = require('swagger-ui-express')

module.exports = ({
  config,
  db
}) => {
  console.info('Init DOCS API module')
  const app = Router()
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  return app
}
