const {
  Router
} = require('express')
const validate = require('express-validation')
const validations = require('./validation.js')
const eventFactory = require('./event-factory')

module.exports = ({
  config,
  db,
  loginManager
}) => {
  console.info('Init Events module')
  const route = Router()

  route.post('/event',
    validate(validations.createEvent),
    loginManager.authentication,
    (req, res, next) => {
      const event = eventFactory.insert(req.body)

      db.saveEvent(event).then((savedEvent) => {
        res.json(savedEvent)
        next()
      }).catch((error) => {
        console.log(error)

        res.status(500).json({
          error: 'Event no registered, please try again'
        })
        next()
      })
    })

  route.get('/event',
    (req, res, next) => {
      db.listEvent({
        filter: req.query
      }).then((events) => {
        res.json(events)
        next()
      })
    })

  route.put('/event/:eventId',
    validate(validations.updateEvent),
    loginManager.admin,
    (req, res, next) => {
      const eventId = req.params.eventId
      const event = eventFactory.update(req.body)

      db
        .updateEvent(eventId, event)
        .then(() => {
          res.status(200).json({})
          next()
        })
    })

  route.get('/event/pending',
    loginManager.authentication,
    (req, res, next) => {
      db.listEvent({
        filter: req.query,
        pending: true
      }).then((events) => {
        res.json(events)
        next()
      })
    })

  route.get('/event/:eventId',
    (req, res, next) => {
      const eventId = req.params.eventId
      db
        .getEvent(eventId)
        .then((event) => {
          res.json(event)
          next()
        })
    })

  route.delete('/event/:eventId',
    loginManager.admin,
    (req, res, next) => {
      const eventId = req.params.eventId
      db
        .deleteEvent(eventId)
        .then(() => {
          res.status(200).json({})
          next()
        }).catch((err) => res.status(500).json(err))
    })

  return route
}
