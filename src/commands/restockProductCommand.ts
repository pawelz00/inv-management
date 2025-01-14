import {IResponse} from "../types/response";
import {getSingleProductById} from "../queries/getSingleProductById";

export async function restockProductCommand(value: number, _id: any): Promise<IResponse> {
    const id = parseInt(_id);
    if(isNaN(id)) {
        return {
            status: 400,
            message: `Invalid id: ${id}`,
        };
    }

    const product = await getSingleProductById(id);
    if (!product) {
        return {
            status: 404,
            message: `Product with id ${id} not found.`,
        };
    }

    product.stock += Number(value);

    return {
        status: 200,
        message: `Product with id ${id} has been restocked.`,
        data: product,
    }
}