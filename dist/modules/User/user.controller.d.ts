import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserById(userId: string): Promise<{
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
