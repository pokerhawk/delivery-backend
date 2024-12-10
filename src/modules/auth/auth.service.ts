import { BadRequestException, Injectable } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { userToReturnMapper } from 'src/utils/mappers/user-to-return.mapper';
import { TwoFactorAuthService } from './two-factor-auth.service';
import { User } from 'prisma/generated/client';

export interface ILoginBody {
    email: string;
    password: string;
}

type UserJwtProps = {
    sub: string;
    email: string;
    name?: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: ClientService,
        private readonly jwtService: JwtService,
        private readonly twoFactorService: TwoFactorAuthService
    ){}

    validateApiKey(apiKey: string){
        const apiKeys: string[] = [process.env.API_KEY];
        return apiKeys.find(key => key == apiKey)
    }

    async validateUser(email: string, password: string){
        const user = await this.prisma.user.findUnique({where: {email: email}})
        if (user && await bcrypt.compare(password, user.password)) {
            return userToReturnMapper(user);
        }
    }

    async register(userPayload: CreateUserDto){
        const user = {
            ...userPayload,
            password: bcrypt.hashSync(userPayload.password, 10)
        };

        const emailExists = await this.prisma.user.findFirst({
            where:{email: user.email}
        })

        if(emailExists)
        throw new BadRequestException("Este email já existe")
        
        await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            }
        })
        return 'Cadastrado com sucesso!'
    }

    async login(body: ILoginBody){
        const user = await this.validateUser(body.email, body.password);
        const userJwt: UserJwtProps = {
            sub: user.id,
            email: user.email,
            name: user.name,
        };

        const { uri } = await this.twoFactorService.generateTwoFactorAuthSecret(user.email);

        return {
            id: user.id,
            type: user.accountAccess,
            access_token: this.jwtService.sign(userJwt),
            refresh_token: this.jwtService.sign(userJwt, { expiresIn: '60d' }),
            qrcode: uri
        }
    }

    async verify2FA(body: any){
        const user = await this.prisma.user.findFirst({where:{id: body.userId}})
        const verifyCode = await this.twoFactorService.verifyTwoFaCode(body.code, user)

        return {
            token: verifyCode,
            message: `Bem vindo ${user.name}`
        }
    }
}