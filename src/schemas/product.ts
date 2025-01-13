import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().max(50).required(),
    description: Joi.string().max(50).required(),
    price: Joi.number().positive().required(),
    stock: Joi.number().positive().required(),
})

export const restockProductSchema = Joi.object({
    value: Joi.number().positive().required(),
})
