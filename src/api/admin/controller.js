import Administrator from './model'
import { success } from './../../constants'

export const create = (req, res) =>
  Administrator.create(new Administrator(req.body))
    .then(admin => admin)
    .then(success(res))
    .catch((err) => {
      return res.status(500).json({
        status: false,
        data: err
      })
    })

export const find = (req, res) => {
  let find = {}
  find = Administrator.find().exec()

  find.then((administrator) => {
    if (!administrator) {
      return res.status(404).json({
        status: false,
        data: {}
      })
    }

    return res.status(200).json({
      status: true,
      data: administrator
    })
  }).catch((err) => {
    return res.status(500).json({
      status: false,
      data: err
    })
  })
}

export const remove = (req, res) => {
  Administrator.findByIdAndRemove(req.params.id)
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
