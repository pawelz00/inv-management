import {db} from "../db";
import {Order} from "../types/order";
import {getProducts} from "../queries/getProducts";

export async function placeOrder(data: Order): Promise<{status: number, message: string}> {
    const lastId = db.data.orders[db.data.orders.length - 1]?.id || 0;
    const products = await getProducts();
    let message = '';
    let productsToPush: { productId: number; quantity: number; }[] = [];

    for (const product of data.products) {
        const productToPush = products.find((p) => p.id === product.productId);

        if (!productToPush) {
            return { status: 404, message: `Product with id ${product.productId} not found.` };
        }

        if (productToPush.stock < product.quantity) {
            return { status: 400, message: `Product with id ${product.productId} has not enough stock.` };
        }

        productToPush.stock -= product.quantity;
        productsToPush.push(product);
    }

    db.data.orders.push({
        id: lastId + 1,
        customerId: data.customerId,
        products: productsToPush
    });

    return { status: 201, message: 'Order created' };
}