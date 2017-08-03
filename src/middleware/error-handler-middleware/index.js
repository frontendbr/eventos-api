const expressValidation = require('express-validation');

module.exports = ({ app, db }) => {
    console.info('Init Error Handler Middleware module');

    app.use((err, req, res, next) => {
        if (err instanceof expressValidation.ValidationError) {
            res.status(err.status).json(err);
        } else {
            res.status(500)
                .json({
                    status: err.status,
                    message: err.message
                });
        }
    });

}
