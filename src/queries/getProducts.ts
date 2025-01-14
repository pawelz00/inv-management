import {db} from "../db";
import {Products} from "../types/product";

export async function getProducts(): Promise<Products> {
   return db.data.products
}