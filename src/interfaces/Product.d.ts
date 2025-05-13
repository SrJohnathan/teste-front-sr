export interface MenuItem {
    name: string
    eco?: boolean
    description?: string
    products: Product[]
}

export interface Product {
    name: string
    description?: string
    price: number
    originalPrice?: number
    discount?: boolean
    fromPrice?: boolean
    eco?: boolean
}