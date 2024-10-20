// src/app/types/cartTypes.ts

export type CartItem = {
    productId: string; // Cambia 'string' por el tipo de datos que necesites
    quantity: number;
};

export type Cart = {
    id: string; // Cambia 'string' por el tipo de datos que necesites
    userId: string; // Cambia 'string' por el tipo de datos que necesites
    items: CartItem[];
};
