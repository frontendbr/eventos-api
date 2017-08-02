const { Router } = require('express');

module.exports = ({ config, db, loginManager }) => {
    console.info('Init Events module');
    const route = new Router();


    route.post('/event', loginManager.authentication, (req, res, next) => {
        //TODO realizar validacoes antes de mandar salvar
        db.saveEvent(req.body).then(()=>{
            res.json(req.body);
            next();
        }).catch(()=>{
            res.json({ erro : 'deu ruim'});
            next();
        });
    });

    return route;
}