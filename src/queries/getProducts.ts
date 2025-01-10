import {db} from "../db";

export async function getProducts() {
    const {products} = db.data
    return products
}