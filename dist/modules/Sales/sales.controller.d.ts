import { SalesService } from './sales.service';
import { CreateSalesDto } from './dto/create-sales.dto';
import { UpdateSaleDto } from './dto/update-sale-status.dto';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    create(salePayload: CreateSalesDto): Promise<string>;
    userSales(rows: number, page: number, id: string): Promise<{
        data: {
            clientAddress: {
                number: string;
                id: string;
                name: string;
                phone: string;
                zipcode: string;
                address: string;
                neighborhood: string;
                city: string;
                state: string;
                complement: string;
                deliveryDate: Date | null;
            };
            saleDate: Date;
            transactionValue: number;
            paymentMethod: string;
            quantity: number;
            status: import("prisma/generated/client").$Enums.SaleStatus;
            commissionValue: number;
        }[];
        count: number;
        currentPage: number;
        nextPage: number;
        prevPage: number;
        lastPage: number;
    }>;
    updateSaleStatus(updateStatusPayload: UpdateSaleDto): Promise<void>;
}
