import {Product} from "../types/product";
import {getProducts} from "./getProducts";

export async function getSingleProductById(id: number): Promise<Product | undefined> {
    const products = await getProducts()
    return products?.find((pr) => pr.id === id);
}