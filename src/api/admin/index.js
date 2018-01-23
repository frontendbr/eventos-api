import { Router } from 'express'

import { create, find, remove } from './controller'

const router = (loginManager) => {
  console.info('Init Admin module')
  const route = Router()

  route.post('/', loginManager.admin, create)
  route.get('/', loginManager.admin, find)
  route.delete('/:id', loginManager.admin, remove)

  return route
}

export default router
