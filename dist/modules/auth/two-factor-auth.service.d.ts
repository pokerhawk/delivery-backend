import { User } from 'prisma/generated/client';
import { ClientService } from 'src/client/client.service';
export declare class TwoFactorAuthService {
    private readonly prisma;
    constructor(prisma: ClientService);
    generateTwoFactorAuthSecret(loggedUserEmail: string): Promise<string>;
    verifyTwoFaCode(code: string, user: User): Promise<boolean>;
}
