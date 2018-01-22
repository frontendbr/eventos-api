export default () => {
  console.info('Init Middleware Login module')
  // TODO esse middleware vai ser refatorado ao fazer o Login
  const authentication = (req, res, next) => next()
  const isAdmin = (user) => { }
  const admin = (req, res, next) => next()

  return {
    authentication,
    admin,
    isAdmin
  }
}
