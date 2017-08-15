const firebase = require('firebase');
const config = require('config');
const eventProcessor = require('./event-processor');

module.exports = (callback) => {
  console.info('Init Database module');

  firebase.initializeApp(config.firebase);

  callback({
    signOut: () => {
      return firebase.auth().signOut();
    },
    listEvent: (filter) => {
      return new Promise((resolve, resject) => {
        firebase
          .database()
          .ref('events')
          .orderByChild('title')
          .once('value', (snapshot) => {
            const events = eventProcessor.process(filter, snapshot);
            resolve(events);
          });
      });
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
