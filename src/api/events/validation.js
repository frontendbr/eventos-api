const joi = require('joi');

const dateEvent = joi.object().keys({
    day: joi.string().required(),
    month: joi.string().required(),
    year: joi.number().required()
});

const locationEvent = joi.object().keys({
    city: joi.string().required(),
    state: joi.string().required(),
    address: joi.string(),
    locationUrl: joi.string(),
    zipCode: joi.string()
});


module.exports = {
    createEvent: {
        body: {
            title: joi.string().required(),
            date: dateEvent.required(),
            location: locationEvent.required(),
            shortDescription: joi.string().required(),
            price: joi.string().required(),
            link: joi.string().required(),
            image: joi.string().empty()
        }
    }
}






