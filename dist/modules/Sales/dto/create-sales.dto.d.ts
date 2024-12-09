type ClientAddressProps = {
    name: string;
    phone: string;
    zipcode: string;
    address: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    complement: string;
    deliveryDate: Date;
};
export declare class CreateSalesDto {
    userId: string;
    saleDate: string;
    transactionValue: number;
    paymentMethod: string;
    quantity: number;
    commissionOption: boolean;
    clientAddress: ClientAddressProps;
}
export {};
