"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const client_service_1 = require("../../client/client.service");
const adjust_date_1 = require("../../utils/date/adjust-date");
let SalesService = class SalesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(salePayload) {
        const saleDate = (0, adjust_date_1.transformDate)(salePayload.saleDate);
        const sale = {
            ...salePayload,
            saleDate: saleDate,
            transactionValue: Number(salePayload.transactionValue * 100)
        };
        const seller = await this.prisma.user.findUnique({
            where: { id: sale.userId },
        });
        await this.prisma.sale.create({
            data: {
                userId: sale.userId,
                saleDate: sale.saleDate,
                transactionValue: sale.transactionValue,
                commissionValue: (seller.commission * sale.transactionValue) / 100,
                paymentMethod: sale.paymentMethod,
                quantity: sale.quantity
            }
        });
        return 'Venda criada com sucesso!';
    }
    async userSales(rows, page, id) {
        const [sales, salesCount] = await this.prisma.$transaction([
            this.prisma.sale.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                take: rows,
                skip: (page - 1) * rows,
                where: { userId: id },
                select: {
                    saleDate: true,
                    transactionValue: true,
                    commissionValue: true,
                    quantity: true,
                    status: true,
                    paymentMethod: true,
                    clientAddress: true
                }
            }),
            this.prisma.sale.count({
                where: { userId: id }
            })
        ]);
        return {
            data: sales,
            count: salesCount,
            currentPage: page,
            nextPage: (page + 1) > (salesCount / rows) ? page : page + 1,
            prevPage: (page - 1) < 0 ? page : page - 1,
            lastPage: Math.ceil(salesCount / rows)
        };
    }
    async updateSaleStatus(updateStatusPayload) {
        await this.prisma.sale.update({
            where: { id: updateStatusPayload.saleId },
            data: { status: updateStatusPayload.status }
        });
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], SalesService);
//# sourceMappingURL=sales.service.js.map