import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validateUser(email: string, password: string): Promise<Partial<{
        name: string;
        id: string;
        accountAccess: import("prisma/generated/client").$Enums.AccountAccess;
        email: string;
        password: string;
        mfaEnabled: boolean;
        mfaSecret: string | null;
        commission: number;
        potLimit: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>>;
}
export {};
