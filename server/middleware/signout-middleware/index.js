module.exports = ({ app, db }) => {
  app.use(( req, res, next ) => {
    db.signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  });
}
