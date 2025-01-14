import express from 'express';
import {getProducts} from "../queries/getProducts";
import {createProductCommand} from "../commands/createProductCommand";
import {productSchema, stockProductSchema} from "../schemas/product";
import {ValidationError} from "joi";
import {restockProductCommand} from "../commands/restockProductCommand";
import {sellProductCommand} from "../commands/sellProductCommand";

export const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    try {
        const products = await getProducts()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error: JSON.stringify(error) })
    }
})

productRouter.post('/', async (req, res) => {
    try {
        await productSchema.validateAsync(req.body)
        const item = await createProductCommand(req.body)

        res.status(item.status).json({
            message: item.message,
            data: item.data,
        })

    } catch (error) {
        if ((error as ValidationError).isJoi) {
            const errorMessage = (error as ValidationError).details[0]?.message.replace(/"/g, '');
            res.status(400).json({ message: `Invalid product data`, error: errorMessage});
            return;
        }

        res.status(500).json({ message: "`Failed to create product.", error: JSON.stringify(error)})
    }
})

productRouter.post('/:id/restock', async (req, res) => {
  try {
    await stockProductSchema.validateAsync(req.body);
    const response = await restockProductCommand(req.body.value, req.params.id);

    res.status(response.status).json({
        message: response.message,
        data: response.data,
        error: response.error,
    });
  } catch (error) {
      if ((error as ValidationError).isJoi) {
          const errorMessage = (error as ValidationError).details[0]?.message.replace(/"/g, '');
          res.status(400).json({ message: `Invalid data`, error: errorMessage});
          return;
      }
      res.status(500).json({
          message: "Failed to restock product",
          error: JSON.stringify(error)
      })
  }
})

productRouter.post('/:id/sell', async (req, res) => {
    try {
        await stockProductSchema.validateAsync(req.body);
        const response = await sellProductCommand(req.body.value, req.params.id);

        res.status(response.status).json({
            message: response.message,
            data: response.data,
            error: response.error,
        });
    } catch (error) {
        if ((error as ValidationError).isJoi) {
            const errorMessage = (error as ValidationError).details[0]?.message.replace(/"/g, '');
            res.status(400).json({ message: `Invalid data`, error: errorMessage});
            return;
        }

        res.status(500).json({
            message: "Failed to sell the product",
            error: JSON.stringify(error)
        })
    }
})