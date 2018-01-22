import { Router } from 'express'

import { auth } from './controller'

const router = (loginManager) => {
  console.info('Init Auth module')
  const route = Router()

  route.post('/', auth)

  return route
}

export default router
