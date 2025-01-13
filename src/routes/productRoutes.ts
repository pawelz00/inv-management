import express from 'express';
import {getProducts} from "../queries/getProducts";
import {createProductCommand} from "../commands/createProductCommand";
import {productSchema} from "../schemas/product";
import {ValidationError} from "joi";

export const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    try {
        const products = await getProducts()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch products : ${JSON.stringify(error)}` })
    }
})

productRouter.post('/', async (req, res) => {
    try {
        await productSchema.validateAsync(req.body)

        const item = await createProductCommand(req.body)
        res.status(201).json(item)
    } catch (error) {

        if ((error as ValidationError).isJoi) {
            const details = (error as ValidationError).details.map(item => item.message).join(', ');
            res.status(400).json({ error: `Invalid product data: ${details}` });
            return;
        }

        res.status(500).json({ error: `Failed to create product.` })
    }
})