import Administrator from './model'
import { success } from './../../constants'

export const create = (req, res, next) =>
  Administrator.create(new Administrator(req.body))
    .then(admin => admin)
    .then(success(res))
    .catch(next)
