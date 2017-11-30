import Administrator from './model'
import { success } from './../../constants'

export const create = ({ bodymen: { body } }, response, next) =>
  Administrator.create({ ...body })
    .then(admin => admin)
    .then(success(response))
    .catch(next)
