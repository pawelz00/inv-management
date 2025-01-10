import express from 'express';
import {getProducts} from "../queries/getProducts";

export const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    try {
        const products = await getProducts()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch products : ${JSON.stringify(error)}` })
    }
})

