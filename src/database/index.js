const firebase = require('firebase');
const config = require('config');

module.exports = (callback) => {
  console.info('Init Database module');

  firebase.initializeApp(config.firebase);

  callback({
    signOut: () => {
      return firebase.auth().signOut();
    },

    saveEvent: (event) => {
      return firebase
        .database()
        .ref('events')
        .push(event)
        .then((reference) => {
          event.key = reference.key;
          return event;
        });
    }
  });
}
