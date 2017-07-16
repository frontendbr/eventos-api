const { Router } = require('express');
const { Strategy } = require('passport-github2');
const passport = require('passport');
const firebase = require('firebase');
const admin = require('../../admin-firebase')();

module.exports = ({ config, db }) => {
  console.info('Init Middleware Passport module');
  const routes = Router();


  const GITHUB_CLIENT_ID = config.github.clienteId;
  const GITHUB_CLIENT_SECRET = config.github.clienteSecret;
  const CALLBACK_URL = config.github.callbackURL;


  // Passport session setup.
  //   To support persistent login sessions, Passport needs to be able to
  //   serialize users into and deserialize users out of the session.  Typically,
  //   this will be as simple as storing the user ID when serializing, and finding
  //   the user by ID when deserializing.  However, since this example does not
  //   have a database of user records, the complete GitHub profile is serialized
  //   and deserialized.
  passport.serializeUser((user, done) => {
    //TODO tratar no firebase?
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    //TODO tratar no firebase?
    done(null, obj);
  });


  // Use the GitHubStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and GitHub
  //   profile), and invoke a callback with a user object.
  passport.use(new Strategy({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      const credential = firebase.auth.GithubAuthProvider.credential(accessToken);

      profile.accessToken = accessToken;
      profile.credential = credential;

      // asynchronous verification, for effect...
      process.nextTick(() => {
        // To keep the example simple, the user's GitHub profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the GitHub account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });

    }
  ));



  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  routes.use(passport.initialize());
  routes.use(passport.session());



  // GET /auth/github
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in GitHub authentication will involve redirecting
  //   the user to github.com.  After authorization, GitHub will redirect the user
  //   back to this application at /auth/github/callback
  routes.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }),
    (req, res) => {
      // The request will be redirected to GitHub for authentication, so this
      // function will not be called.
    });


  // GET /auth/github/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function will be called,
  //   which, in this example, will redirect the user to the home page.
  routes.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {

      firebase
      .auth()
        .signInWithCredential(req.user.credential).catch((error) => {
      });
        res.redirect('/home');
    });


    routes.get('/auth',
      (req, res) => {
        const accessToken = req.query.accessToken;
        const credential = firebase.auth.GithubAuthProvider.credential(accessToken);

        firebase
        .auth()
          .signInWithCredential(credential).catch((error) => {
        });
        
          res.redirect('/home');
      });


    return routes;
}
