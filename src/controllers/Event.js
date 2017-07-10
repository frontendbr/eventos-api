'use strict';

var Event = require('./EventService');

module.exports.addEvent = function addEvent (req, res, next) {
  Event.addEvent(req.swagger.params, res, next);
};

module.exports.deleteEvent = function deleteEvent (req, res, next) {
  Event.deleteEvent(req.swagger.params, res, next);
};

module.exports.findEventsByStatus = function findEventsByStatus (req, res, next) {
  Event.findEventsByStatus(req.swagger.params, res, next);
};

module.exports.getEventById = function getEventById (req, res, next) {
	console.log('test');
  Event.getEventById(req.swagger.params, res, next);
};

module.exports.listEvent = function listEvent (req, res, next) {
  Event.listEvent(req.swagger.params, res, next);
};

module.exports.updateEventWithForm = function updateEventWithForm (req, res, next) {
  Event.updateEventWithForm(req.swagger.params, res, next);
};

module.exports.uploadFile = function uploadFile (req, res, next) {
  Event.uploadFile(req.swagger.params, res, next);
};
