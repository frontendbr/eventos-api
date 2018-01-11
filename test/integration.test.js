import MongoInMemory from 'mongo-in-memory'
import { spawn } from 'child_process'
import promiseSerial from 'promise-serial'
import path from 'path'
import mongoFixture from 'pow-mongodb-fixtures'

const port = 8000
const databaseName = 'eventos-api'

const mongoServerInstance = new MongoInMemory(port)
let api

mongoServerInstance.start((error, config) => {
  if (error) {
    console.error(`MongoInMemory error: ${error}`)

    process.exit(1)
  } else {
    console.log(`MongoInMemory started: ${mongoServerInstance.getMongouri(databaseName)}`)
    promiseSerial([
      addFixtures.bind(null, config),
      startApi,
      startTestIntegration,
      killDatabase,
      stopApi
    ]).then(() => {
      process.exit(0)
    })
  }
})

const addFixtures = (config) => {
  return new Promise(resolve => {
    const fixtures = mongoFixture.connect(databaseName, {
      host: config.host,
      port: config.port
    })
    const pathFixture = path.join(__dirname, '/fixtures')
    console.log('Iniciando importação', pathFixture)

    fixtures.load(pathFixture, () => {
      console.log('Dados importados')
      resolve()
    })
  })
}

const startApi = () => {
  return new Promise((resolve) => {
    console.log('Start API ...')

    api = spawn('npm', ['run', 'test:integration:up'], { shell: true, stdio: 'inherit', detached: true })
    setTimeout(resolve, 5000)
  })
}

const stopApi = () => {
  return new Promise((resolve) => {
    process.kill(-api.pid)
    resolve()
  })
}

const startTestIntegration = () => {
  return new Promise((resolve, reject) => {
    console.log('Start test integration ...')
    const integration = spawn('npm', ['run', 'test:integration:run'], { shell: true, stdio: 'inherit' })
    integration.on('close', resolve)
  })
}

const killDatabase = () => {
  return new Promise((resolve) => {
    mongoServerInstance.stop((error) => {
      if (error) {
        console.error(`Error stop MongoMemory: ${error}`)
      } else {
        console.log('MongoInMemory foi finalizado')
      }
      resolve()
    })
  })
}
