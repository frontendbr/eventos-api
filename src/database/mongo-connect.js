import mongoose from 'mongoose'
import bluebird from 'bluebird'
import config from 'config'

export default () => {
  // Set mongoose promise
  mongoose.Promise = bluebird

  // Function to create url connection
  const _connection = ({
    MONGO_USERNAME = config.mongo.username,
    MONGO_PASSWORD = config.mongo.password,
    MONGO_HOST = config.mongo.host,
    MONGO_PORT = config.mongo.port,
    MONGO_DATABASE = config.mongo.database
  }) => {
    const AUTH = `${MONGO_USERNAME}:${MONGO_PASSWORD}@`

    return `mongodb://${AUTH}${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`
  }

  const _urlConnection = _connection(process.env)

  // Init connection
  mongoose.connect(_urlConnection, {
    useMongoClient: true,
    promiseLibrary: bluebird
  })

  const database = mongoose.connection

  database.on('error', () => console.log(`Failed to connect : ${_urlConnection}`))
  database.once('open', () => console.log(`Connected : ${_urlConnection}`))
}
