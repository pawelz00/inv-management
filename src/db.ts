import {JSONFilePreset} from 'lowdb/node'
import {Products} from "./types/product";
import {Orders} from "./types/order";

type Data = {
    products: Products
    orders: Orders
}

const defaultData: Data = {
    products: [],
    orders: []
}

export const db = await JSONFilePreset<Data>('db.json', defaultData)