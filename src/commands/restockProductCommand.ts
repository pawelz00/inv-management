import {Product} from "../types/product";

export async function restockProductCommand(value: number,  product: Product): Promise<void> {
    product.stock += value;
}