import {IResponse} from "../types/response";
import {getSingleProductById} from "../queries/getSingleProductById";

export async function sellProductCommand(_value: number,  _id: any): Promise<IResponse> {
    const id = parseInt(_id);
    if(isNaN(id)) {
        return {
            status: 400,
            message: `Invalid id: ${id}`,
            data: null,
        };
    }

    const product = await getSingleProductById(id);
    if (!product) {
        return {
            status: 404,
            message: `Product with id ${id} not found.`,
            data: null,
        };
    }

    const value = Number(_value);

    if(product.stock - value  < 0) {
        return {
            status: 400,
            message: `Not enough stock to sell ${value} items.`,
            data: null,
        };
    }

    product.stock -= value;

    return {
        status: 200,
        message: `Product with id ${id} has been sold.`,
        data: product,
    }
}