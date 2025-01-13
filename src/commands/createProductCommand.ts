import {db} from "../db";

export function createProductCommand(data: any) {
    const lastId = db.data.products[db.data.products.length - 1]?.id || 0
    db.data.products.push({id: lastId + 1, ...data})
    return data
}