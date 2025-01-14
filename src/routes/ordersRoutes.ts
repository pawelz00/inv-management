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
    res.status(500).json({ message: "Failed to fetch orders", error: JSON.stringify(error)})
 }
})

ordersRoutes.post('/', async (req, res) => {
    try {
        await orderSchema.validateAsync(req.body)
        const response = await placeOrder(req.body)
        res.status(response.status ?? 404).json({ message: response.message, data: response.data })

    } catch (error) {
        if ((error as ValidationError).isJoi) {
            const errorMessage = (error as ValidationError).details[0]?.message.replace(/"/g, '');
            res.status(400).json({ message: "Invalid request data", error: errorMessage });
            return;
        }
        res.status(500).json({ message: "Failed to create order", error: JSON.stringify(error) })
    }
})