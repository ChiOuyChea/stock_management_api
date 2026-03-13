const Joi = require("joi");

exports.storeProductRequest = Joi.object({
    name       : Joi.string().required(),
    quantity   : Joi.number().required(),
    price_in   : Joi.number().required(),
    price_out  : Joi.number(),
    description: Joi.string(),
    image      : Joi.string(),
});

exports.updateProductRequest = Joi.object({
    name       : Joi.string().required(),
    quantity   : Joi.number().required(),
    price_in   : Joi.number().required(),
    price_out  : Joi.number(),
    description: Joi.string(),
    image      : Joi.string(),
})