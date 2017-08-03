const { Router } = require('express');
const validate = require('express-validation');
const validations = require('./validation.js');

module.exports = ({ config, db, loginManager }) => {
    console.info('Init Events module');
    const route = new Router();

    route.post('/event', validate(validations.createEvent), loginManager.authentication, (req, res, next) => {
        db.saveEvent(req.body).then(() => {
            res.json(req.body);
            next();
        }).catch(() => {
            res.json({ erro: 'deu ruim' });
            next();
        });
    });

    return route;
}