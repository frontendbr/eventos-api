'use strict';

exports.addEvent = function(args, res, next) {
  /**
   * Add a new event
   * 
   *
   * body Body Event object that needs to be added
   * no response value expected for this operation
   **/
  res.end();
}

exports.deleteEvent = function(args, res, next) {
  /**
   * Deletes a event
   * 
   *
   * eventId Long Event id to delete
   * no response value expected for this operation
   **/
  res.end();
}

exports.findEventsByStatus = function(args, res, next) {
  /**
   * Finds Events by status
   * Multiple status values can be provided with comma separated strings
   *
   * status List Status values that need to be considered for filter
   * offset Integer The number of items to skip before starting to collect the result set. (optional)
   * limit Integer The numbers of items to return. (optional)
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "date" : "20/02/2017",
  "price" : "100.00",
  "id" : 123456789,
  "shortDescription" : "Evento para frontends discutirem sobre assuntos bacanas",
  "title" : "Front In Sampa",
  "local" : "Avenida Paulista, 1000",
  "eventLink" : "http://link-para-o-evento.com.br"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getEventById = function(args, res, next) {
  /**
   * Find event by ID
   * Returns a single Event
   *
   * eventId Long ID of event to return
   * returns inline_response_200
   **/
  var examples = {};
  examples['application/json'] = {
  "date" : "20/02/2017",
  "price" : "100.00",
  "id" : 123456789,
  "shortDescription" : "Evento para frontends discutirem sobre assuntos bacanas",
  "title" : "Front In Sampa",
  "local" : "Avenida Paulista, 1000",
  "eventLink" : "http://link-para-o-evento.com.br"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.listEvent = function(args, res, next) {
  /**
   * List all events
   * 
   *
   * month Integer The month. (optional)
   * state String The state. (optional)
   * keywords String keywords for search. (optional)
   * offset Integer The number of items to skip before starting to collect the result set. (optional)
   * limit Integer The numbers of items to return. (optional)
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "date" : "20/02/2017",
  "price" : "100.00",
  "id" : 123456789,
  "shortDescription" : "Evento para frontends discutirem sobre assuntos bacanas",
  "title" : "Front In Sampa",
  "local" : "Avenida Paulista, 1000",
  "eventLink" : "http://link-para-o-evento.com.br"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.updateEventWithForm = function(args, res, next) {
  /**
   * Updates a event in the store with form data
   * 
   *
   * eventId Long ID of event that needs to be updated
   * body Body_1 Event object that needs to be added
   * no response value expected for this operation
   **/
  res.end();
}

exports.uploadFile = function(args, res, next) {
  /**
   * uploads an image
   * 
   *
   * eventId Long ID of event to update
   * additionalMetadata String Additional data to pass to server (optional)
   * file File file to upload (optional)
   * returns inline_response_200_1
   **/
  var examples = {};
  examples['application/json'] = {
  "code" : 123,
  "type" : "aeiou",
  "message" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

