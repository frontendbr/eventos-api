'use strict';
const firebase = {
    initializeApp: () => { },
    auth: () => {
        GithubAuthProvider: { credential: () => { } }
        signInWithCredential: () => { }
        signOut: () => { }
    },
    database: () => { ref: () => { push: () => { } } }
};

exports = module.exports = firebase;
