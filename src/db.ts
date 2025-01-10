import {JSONFilePreset} from 'lowdb/node'
import {Products} from "./types/product";

type Data = {
    products: Products
}

const defaultData: Data = { products: [
        { name: 'Apple', description: 'A fruit', price: 0.5, stock: 20 },
]}

export const db = await JSONFilePreset<Data>('db.json', defaultData)