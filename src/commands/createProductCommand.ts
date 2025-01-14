import {db} from "../db";
import {Product, ProductDraft} from "../types/product";
import {IResponse} from "../types/response";

export async function createProductCommand(data: ProductDraft): Promise<IResponse> {
    const lastId = db.data.products[db.data.products.length - 1]?.id || 0

    const newProduct: Product = {
        id: lastId + 1,
        ...data,
        price: Number(data.price),
        stock: Number(data.stock)
    }

    db.data.products.push(newProduct)

    return {
        message: "Product created successfully",
        data: newProduct,
        status: 201,
    }
}