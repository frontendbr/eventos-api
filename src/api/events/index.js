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

            db.saveEvent(req.body).then(() => {
                res.json(req.body);
                next();
            }).catch(() => {
                res.status(500).json({ error: 'Event no registered, please try again' });
                next();
            });

        });

    return route;
}