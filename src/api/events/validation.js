const joi = require('joi');

module.exports = {
    createEvent: {
        body: {
            title: joi.string().required(),
            date: joi.string().required(),
            zipCode: joi.string(),
            local: joi.string().required(),
            shortDescription: joi.string().required(),
            price: joi.number().min(0).required(),
            eventLink: joi.string().required()
        }
    }
}






