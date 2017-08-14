const { Router } = require('express');
const validate = require('express-validation');
const validations = require('./validation.js');

module.exports = ({ config, db, loginManager }) => {
    console.info('Init Events module');
    const route = Router();

    route.post('/event',
        validate(validations.createEvent),
        loginManager.authentication,
        (req, res, next) => {
            
            const event = {
                title: req.body.title,
                date: req.body.date,
                zipCode: req.body.zipCode || "",
                local: req.body.local,
                shortDescription: req.body.shortDescription,
                price: req.body.price,
                eventLink: req.body.eventLink,
                pending: true
            };

            db.saveEvent(event).then((savedEvent) => {
                res.json(savedEvent);
                next();
            }).catch(() => {
                res.status(500).json({ error: 'Event no registered, please try again' });
                next();
            });

        });

    return route;
}