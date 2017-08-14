const firebase = require('firebase');

module.exports = ({ config, db }) => {
    console.info('Init Middleware Login module');

    function authentication(req, res, next) {
        const accessToken = req.get('Authorization');
        if (accessToken) {
            const credential = firebase.auth.GithubAuthProvider.credential(accessToken);

            firebase
                .auth()
                .signInWithCredential(credential)
                .then((user) => {
                    req.authentication = { user: user };
                    next();
                })
                .catch((error) => {
                    res.status(401).json(error);
                });

        } else {
            res.status(401).json({
                status: 401,
                message: "header Authorization is required"
            });
        }
    }

    return {
        authentication: authentication
    }
}