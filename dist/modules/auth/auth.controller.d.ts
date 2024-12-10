import { AuthService, ILoginBody } from './auth.service';
import { CreateUserDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(userPayload: CreateUserDto): Promise<string>;
    login(body: ILoginBody): Promise<{
        id: string;
        type: import("prisma/generated/client").$Enums.AccountAccess;
        access_token: string;
        refresh_token: string;
        qrcode: {
            secret: string;
            uri: string;
            qr: string;
        };
    }>;
    verify2FA(body: any): Promise<{
        token: boolean;
        message: string;
    }>;
}
