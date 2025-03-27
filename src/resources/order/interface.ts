import { ItemAdditional, OrderType, PaymentMethod } from "@prisma/client";

export interface OrderCreate {
    items: Array<Items>
    cpf: string,
    orderType: OrderType,
    name: string,
    paymentMethod: PaymentMethod,
    phone: string,
    transshipment?: string,
    total: string
    neighborhood: string,
    street: string,
    city: string,
    complement?: string,
    number: string,
    referencePoint: string,
}


interface Items {
    id: string
    quantity: number,
    additional?: Array<Additional>;
    observation?: string
}


interface Additional {
    quantity: number;
    id: string
}