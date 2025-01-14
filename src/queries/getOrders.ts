import {db} from "../db";
import {Orders} from "../types/order";

export async function getOrders(): Promise<Orders> {
    return db.data.orders
}