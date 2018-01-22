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
