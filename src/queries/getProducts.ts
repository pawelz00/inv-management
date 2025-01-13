import {db} from "../db";
import {Products} from "../types/product";

export async function getProducts(): Promise<Products> {
   const {products} = db.data
   return products
}