import { ClientService } from 'src/client/client.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: ClientService);
    getUserById(id: string): Promise<{
        id: string;
        accountAccess: import("prisma/generated/client").$Enums.AccountAccess;
        name: string;
        email: string;
        password: string;
        mfaEnabled: boolean;
        mfaSecret: string | null;
        commission: number;
        potLimit: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
}
