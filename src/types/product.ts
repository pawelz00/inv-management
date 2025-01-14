export type ProductDraft = {
    name: string,
    description: string,
    price: number,
    stock: number,
}

export interface Product extends ProductDraft {
    id: number,
}

export type Products = Product[]