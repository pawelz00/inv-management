import {db} from "../db";

export function createProductCommand(data: any) {
    db.data.products.push(data)
    return data
}