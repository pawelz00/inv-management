import express from 'express';
import {getProducts} from "../queries/getProducts";
import {createProductCommand} from "../commands/createProductCommand";
import {productSchema, stockProductSchema} from "../schemas/product";
import {ValidationError} from "joi";
import {getSingleProductById} from "../queries/getSingleProductById";
import {restockProductCommand} from "../commands/restockProductCommand";
import {sellProductCommand} from "../commands/sellProductCommand";

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

        console.error(error)
        res.status(500).json({ error: `Failed to create product. - ${JSON.stringify(error)}` })
    }
})

productRouter.post('/:id/restock', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if(isNaN(id)) {
        res.status(400).json({ error: `Invalid id ${req.params.id}` });
        return;
    }

    const product = await getSingleProductById(id);

    if (!product) {
      res.status(404).json({ error: `Product with id ${id} not found.` });
      return;
    }

    await stockProductSchema.validateAsync(req.body);
    const value = req.body.value;

    await restockProductCommand(value, product);

    res.status(200).json("Product restocked successfully.");

  } catch (error) {

     if ((error as ValidationError).isJoi) {
         const details = (error as ValidationError).details.map(item => item.message).join(', ');
         res.status(400).json({ error: `Invalid data: ${details}` });
         return;
     }

    console.error(error);
    res.status(500).json({ error: `Failed to restock product. - ${JSON.stringify(error)}` });
  }
})

productRouter.post('/:id/sell', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if(isNaN(id)) {
            res.status(400).json({ error: `Invalid id ${req.params.id}` });
            return;
        }

        const product = await getSingleProductById(id);

        if (!product) {
            res.status(404).json({ error: `Product with id ${id} not found.` });
            return;
        }

        await stockProductSchema.validateAsync(req.body);
        const value = req.body.value;


        const response = await sellProductCommand(value, product);

        if(response?.['message']) {
            res.status(400).json({ error: response['message'] });
            return;
        }

        res.status(200).json("Product sold successfully.");

    } catch (error) {

        if ((error as ValidationError).isJoi) {
            const details = (error as ValidationError).details.map(item => item.message).join(', ');
            res.status(400).json({ error: `Invalid data: ${details}` });
            return;
        }

        console.error(error);
        res.status(500).json({ error: `Failed to sell product. - ${JSON.stringify(error)}` });
    }
})