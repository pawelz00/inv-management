import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().max(50).required(),
    description: Joi.string().max(50).required(),
    price: Joi.number().max(50).positive().required(),
    stock: Joi.number().max(50).positive().required(),
})
