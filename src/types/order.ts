
export type Order = {
    id: number,
    customerId: string,
    products: {
        productId: number,
        quantity: number,
    }[],
}

export type Orders = Order[]