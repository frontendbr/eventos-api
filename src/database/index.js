import connect from './mongo-connect'

module.exports = (next) => {
  console.info('Init Database module')

  // mongo connect
  connect()
  next()
}
