import {JSONFilePreset} from 'lowdb/node'
import {Products} from "./types/product";

type Data = {
    products: Products
}

const defaultData: Data = {
    products: []
}

export const db = await JSONFilePreset<Data>('db.json', defaultData)