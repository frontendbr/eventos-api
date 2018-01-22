import { Router } from 'express'
import { find, create, update, remove } from './controller'

const router = (loginManager) => {
  let route = Router()

  route.get('/:id?', find)
  route.post('/', loginManager.authentication, create)
  route.put('/:id', loginManager.admin, update)
  route.delete('/:id', loginManager.admin, remove)

  return route
}

export default router
