import { AuthService, ILoginBody, Iverify2Fa } from './auth.service';
import { CreateUserDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(userPayload: CreateUserDto): Promise<string>;
    login(body: ILoginBody): Promise<{
        userId: string;
        type: import("prisma/generated/client").$Enums.AccountAccess;
        access_token: string;
        refresh_token: string;
        mfaEnabled: boolean;
    }>;
    generate2FA(userId: string): Promise<{
        qrcode: string;
    }>;
    verify2FA(body: Iverify2Fa): Promise<{
        isValid: boolean;
        message: string;
    }>;
}
