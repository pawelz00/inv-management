import {db} from "../db";
import {Order} from "../types/order";
import {getProducts} from "../queries/getProducts";
import {IResponse} from "../types/response";

export async function placeOrder(data: Order): Promise<IResponse> {
    const lastId = db.data.orders[db.data.orders.length - 1]?.id || 0;
    const products = await getProducts();
    let productsToPush: { productId: number; quantity: number; }[] = [];

    for (const product of data.products) {
        const productToPush = products.find((p) => p.id === product.productId);

        if (!productToPush) {
            return { status: 404, message: `Product with id ${product.productId} not found.` };
        }

        const productQuantity = Number(product.quantity)

        if (productToPush.stock < productQuantity) {
            return { status: 400, message: `Product with id ${product.productId} has not enough stock.` };
        }

        productToPush.stock -= productQuantity;
        productsToPush.push(product);
    }

    db.data.orders.push({
        id: lastId + 1,
        customerId: data.customerId,
        products: productsToPush
    });

    return { status: 201, message: 'Order created', data: data };
}