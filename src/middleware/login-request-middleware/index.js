import Authentication from '../../api/auth/Authentication'
import { error } from '../../constants'
export default () => {
  console.info('Init Middleware Login module')

  const authentication = (req, res, next) =>
    Authentication
      .checkAuth(req)
      .then(() => next())
      .catch((err) => error(res, 401)({ err: err.message }))

  const admin = (req, res, next) => Authentication
    .checkAdmin(req)
    .then(() => next())
    .catch((err) => error(res, 401)({ err: err.message }))

  return {
    authentication,
    admin
  }
}
