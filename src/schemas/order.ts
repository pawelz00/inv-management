import Joi from "joi";


export const orderSchema = Joi.object({
    customerId: Joi.string().required(),
    products: Joi.array().items(Joi.object({
        productId: Joi.number().integer().required(),
        quantity: Joi.number().integer().positive().required(),
    })),
})