const {
  Router
} = require('express')

module.exports = ({
  config,
  db,
  loginManager
}) => {
  console.info('Init Menu module')

  const route = Router()

  route.get('/menu',
    loginManager.authentication,
    (req, res, next) => {
      db.menu({
        isAdmin: loginManager.isAdmin(req.authentication.user)
      }).then((menus) => {
        res.json(menus)
        next()
      }).catch(next)
    })

  return route
}
