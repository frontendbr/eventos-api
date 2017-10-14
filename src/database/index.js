const firebase = require('firebase');
const config = require('config');
const _ = require('lodash');
const eventProcessor = require('./event-processor');
const adminProcessor = require('./admin-processor');

const getEvent = (key) => {
  return firebase
    .database()
    .ref()
    .child('/events/' + key)
    .once('value');
}
module.exports = (callback) => {
  console.info('Init Database module');

  firebase.initializeApp(config.firebase);

  callback({
    signOut: () => {
      return firebase.auth().signOut();
    },
    listEvent: ({
      filter,
      pending = false
    }) => {
      return firebase
        .database()
        .ref('events')
        .orderByChild('title')
        .once('value').then((snapshot) => {
          const events = eventProcessor.process({
            filter,
            pending,
            snapshot
          });

          return events;
        });

    },

    listAdmins: () => {
      return firebase
        .database()
        .ref('admins')
        .once('value').then((snapshot) => {
          const admins = adminProcessor.process({
            snapshot
          });
          return admins;
        });
    },

    addAdmin: ({
      email
    }) => {
      return firebase
        .database()
        .ref('admins')
        .push(email);
    },

    updateEvent: (key, event) => {
      return getEvent(key)
        .then((snapshot) => {
          const evento = snapshot.val();
          const updated = _.merge(evento, event);

          return firebase
            .database()
            .ref()
            .child('/events/' + key)
            .update(updated);
        })
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
    },
    getEvent: (key) => {
      return getEvent(key)
        .then((snapshot) => snapshot.val());
    },
    deleteEvent: (key) => {
      return firebase
      .database()
      .ref('/events/' + key)
      .remove();
    },
    menu: ({ isAdmin }) => {
      //por uma questão de simplicidade, optei por não colocar o menu no firebase.
      const menus = [];

      menus.push({
        id: 'cadastro-evento',
        label: 'Cadastro de eventos',
        url: 'cadastro'
      });

      if(isAdmin){
        menus.push({
          id: 'painel-admin',
          label: 'Dashboard Administrativo',
          url: 'dashboard'
        });
      }

      return Promise.resolve(menus);
    }
  });
}
