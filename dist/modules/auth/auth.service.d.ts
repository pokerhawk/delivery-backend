import { ClientService } from 'src/client/client.service';
import { CreateUserDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { TwoFactorAuthService } from './two-factor-auth.service';
export interface ILoginBody {
    email: string;
    password: string;
}
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly twoFactorService;
    constructor(prisma: ClientService, jwtService: JwtService, twoFactorService: TwoFactorAuthService);
    validateApiKey(apiKey: string): string;
    validateUser(email: string, password: string): Promise<Partial<{
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
    }>>;
    register(userPayload: CreateUserDto): Promise<string>;
    login(body: ILoginBody): Promise<{
        id: string;
        type: import("prisma/generated/client").$Enums.AccountAccess;
        access_token: string;
        refresh_token: string;
        qrcode: {
            otpAuthUrl: string;
        };
    }>;
    verify2FA(body: any): Promise<{
        token: boolean;
        message: string;
    }>;
}
