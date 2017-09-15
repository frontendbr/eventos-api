const { Router } = require('express');

module.exports = ({ config, db, loginManager }) => {
    console.info('Init Admin module');
    const route = Router();

    route.post('/admin',
        loginManager.admin,
        (req, res, next) => {
            const admin = req.body;
            db.addAdmin(admin)
                .then(() => {
                    res.json({});
                    next();
                }).catch((error) => {
                    console.log(error);
                    res
                        .status(500)
                        .json({ error: 'Admin no registered, please try again' });
                    next();
                });

        });

    return route;
}