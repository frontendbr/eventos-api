const firebase = require('firebase');
const config = require('config');
const eventProcessor = require('./event-processor');
const adminProcessor = require('./admin-processor');

module.exports = (callback) => {
  console.info('Init Database module');

  firebase.initializeApp(config.firebase);

  callback({
    signOut: () => {
      return firebase.auth().signOut();
    },
    listEvent: ({ filter, pending = false }) => {
      return new Promise((resolve, resject) => {
        firebase
          .database()
          .ref('events')
          .orderByChild('title')
          .once('value', (snapshot) => {
            const events = eventProcessor.process({ filter, pending, snapshot });
            resolve(events);
          });
      });
    },

    listAdmins:  () => {
      return new Promise((resolve, reject) => {
        firebase
          .database()
          .ref('admins')
          .once('value', (snapshot) => {
            const admins = adminProcessor.process({ snapshot });
            resolve(admins);
          });
      });
    },

    addAdmin: ({ email }) => {
      return firebase
        .database()
        .ref('admins')
        .push(email);
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
