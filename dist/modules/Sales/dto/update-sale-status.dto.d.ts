export declare enum SaleStatus {
    confirmed = "confirmed",
    pending = "pending",
    denied = "denied"
}
export declare class UpdateSaleDto {
    saleId: string;
    status: SaleStatus;
}
