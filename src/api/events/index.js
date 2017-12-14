import express from 'express'
import { find, create, update, remove } from './controller'

const router = (loginManager) => {
  let route = express.Router()

  route.get('/event/:id?', find)
  route.post('/event', loginManager.authentication, create)
  route.put('/event/:id', loginManager.admin, update)
  route.delete('/event/:id', loginManager.admin, remove)

  return route
}

export default router
