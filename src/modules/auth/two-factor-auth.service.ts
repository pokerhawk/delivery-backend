import { Injectable } from '@nestjs/common';
import { User } from 'prisma/generated/client';
import { generateSecret, generateToken, verifyToken } from 'node-2fa';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class TwoFactorAuthService {
  constructor(
    private readonly prisma: ClientService
  ) {

  }
  
  public async generateTwoFactorAuthSecret(loggedUserEmail: string) {
    const user = await this.prisma.user.findFirst({
      where: { email: loggedUserEmail },
    });

    if (user?.mfaEnabled)
    return;

    const otpAuth = generateSecret({
      name: "Projeto Delivery",
      account: user.email
    });

    await this.prisma.user.update({
      where: {id: user.id},
      data: {
        mfaSecret: otpAuth.secret,
        mfaEnabled: true
      }
    });

    return otpAuth;
  }

  async verifyTwoFaCode(code: string, user: User) {
    const isValid = verifyToken(user.mfaSecret, code, 4);
    if(isValid === null){
      return false
    }
    return true
  }
}
