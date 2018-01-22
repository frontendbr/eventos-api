import http from 'http'
import express from 'express'
import morgan from 'morgan'
import middleware from './middleware'
import initializeDb from './database'
import api from './api'
import config from 'config'
import errorHandler from './middleware/error-handler-middleware'

const app = express()
app.server = http.createServer(app)

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

initializeDb(db => {
  app.use(middleware({
    config,
    db,
    app
  }))

  app.use('/api', api({
    config,
    db
  }))

  errorHandler({
    app,
    db
  })

  app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`)
  })
})

module.exports = app
