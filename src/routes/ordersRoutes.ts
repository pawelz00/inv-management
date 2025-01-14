import express from 'express';
import {orderSchema} from "../schemas/order";
import {ValidationError} from "joi";
import {placeOrder} from "../commands/placeOrder";
import {getOrders} from "../queries/getOrders";

export const ordersRoutes = express.Router();

ordersRoutes.get('/', async (req, res) => {
  try {
    const orders = await getOrders()
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch orders : ${JSON.stringify(error)}`})
 }
})


ordersRoutes.post('/', async (req, res) => {
    try {
        await orderSchema.validateAsync(req.body)
        const response = await placeOrder(req.body)

        res.status(response.status).json({ message: response.message })

    } catch (error) {

        if ((error as ValidationError).isJoi) {
            const details = (error as ValidationError).details.map(item => item.message).join(', ');
            res.status(400).json({ error: `Invalid request data: ${details}` });
            return;
        }

        console.error(error)
        res.status(500).json({ error: `Failed to create order: ${JSON.stringify(error)}` })
    }
})