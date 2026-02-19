export interface Product {
    id: number;
    nombre: string;
    url: string;
    tienda: string;
    imagen?: string;
    precio_actual: number;
    createdAt: string;
    updatedAt: string;
    priceHistory?: PriceHistory[];
}

export interface PriceHistory {
    id: number;
    precio: number;
    fecha: string;
    productId: number;
}
