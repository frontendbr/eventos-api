const path = require('path')

module.exports = ({
  config,
  db,
  app
}) => {
  app.set('views', path.join(__dirname, '/ejs'))
  app.set('view engine', 'ejs')

  app.get('/home', (req, res, next) => {
    res.render('home', {
      user: req.user
    })
    next()
  })
}
