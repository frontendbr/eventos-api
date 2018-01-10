import { Router } from 'express'

import { create } from './controller'

const router = (loginManager) => {
  console.info('Init Admin module')
  const route = Router()

  route.post('/', loginManager.authentication, create)

  return route
}

export default router
