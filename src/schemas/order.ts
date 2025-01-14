import Joi from "joi";


export const orderSchema = Joi.object({
    customerId: Joi.string().required(),
    products: Joi.array().items(Joi.object({
        productId: Joi.number().required(),
        quantity: Joi.number().positive().required(),
    })),
})