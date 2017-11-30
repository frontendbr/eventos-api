import { Router } from 'express'
import { middleware as body } from 'bodymen'

import { administratorSchema } from './model'
import { create } from './controller'

const { email } = administratorSchema.tree

module.exports = ({ config, db, loginManager }) => {
  console.info('Init Admin module')
  const route = Router()

  route.post(
    '/',
    loginManager.admin,
    body({ email }),
    create
  )

  return route
}
