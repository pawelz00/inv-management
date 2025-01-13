import {Product} from "../types/product";

export async function sellProductCommand(value: number,  product: Product): Promise<void | {message: string}> {
    if(value - product.stock < 0) {
       return {message: "Not enough stock to sell."};
    }

    product.stock -= value;
}