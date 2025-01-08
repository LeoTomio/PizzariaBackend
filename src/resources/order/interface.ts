interface OrderRequest {
    table: number;
    name: string;
    company_id:string
}


interface OrderRemove {
    order_id: string;
}

export { OrderRequest, OrderRemove };