import Event from './model'

const find = (req, res) => {
  let find = {}
  let paramId = req.params.id

  if (paramId) {
    find = Event.findById(paramId).exec()
  } else {
    find = Event.find(req.query).exec()
  }

  find.then((events) => {
    if (!events) {
      return res.status(404).json({
        status: false,
        data: {}
      })
    }

    return res.status(200).json({
      status: true,
      data: events
    })
  }).catch((err) => {
    return res.status(500).json({
      status: false,
      data: err
    })
  })
}

const create = (req, res) => {
  req.body.price = (req.body.price / 100).toFixed(2)

  let event = new Event(req.body)

  event.save()
    .then((event) => {
      if (!event) {
        return res.status(404).json({
          status: false,
          data: {}
        })
      }

      return res.status(200).json({
        status: true,
        data: event
      })
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        data: err
      })
    })
}

const update = (req, res) => {
  Event.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((event) => {
      if (!event) {
        return res.status(404).json({
          status: false,
          data: {}
        })
      }

      return res.status(200).json({
        status: true,
        data: event
      })
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        data: err
      })
    })
}

const remove = (req, res) => {
  Event.findByIdAndRemove(req.params.id)
    .then(() => {
      return res.status(200).json({
        status: true
      })
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        data: err
      })
    })
}

export { find, create, update, remove }
