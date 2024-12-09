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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const client_service_1 = require("../../client/client.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_to_return_mapper_1 = require("../../utils/mappers/user-to-return.mapper");
const two_factor_auth_service_1 = require("./two-factor-auth.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService, twoFactorService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.twoFactorService = twoFactorService;
    }
    validateApiKey(apiKey) {
        const apiKeys = [process.env.API_KEY];
        return apiKeys.find(key => key == apiKey);
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({ where: { email: email } });
        if (user && await bcrypt.compare(password, user.password)) {
            return (0, user_to_return_mapper_1.userToReturnMapper)(user);
        }
    }
    async register(userPayload) {
        const user = {
            ...userPayload,
            password: bcrypt.hashSync(userPayload.password, 10)
        };
        const emailExists = await this.prisma.user.findFirst({
            where: { email: user.email }
        });
        if (emailExists)
            throw new common_1.BadRequestException("Este email já existe");
        await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            }
        });
        return 'Cadastrado com sucesso!';
    }
    async login(body) {
        const user = await this.validateUser(body.email, body.password);
        const userJwt = {
            sub: user.id,
            email: user.email,
            name: user.name,
        };
        const qrcode = await this.twoFactorService.generateTwoFactorAuthSecret(user.email);
        return {
            id: user.id,
            type: user.accountAccess,
            access_token: this.jwtService.sign(userJwt),
            refresh_token: this.jwtService.sign(userJwt, { expiresIn: '60d' }),
            qrcode
        };
    }
    async verify2FA(body) {
        const user = await this.prisma.user.findFirst({ where: { id: body.userId } });
        const verifyCode = await this.twoFactorService.verifyTwoFaCode(body.code, user);
        return {
            token: verifyCode,
            message: `Bem vindo ${user.name}`
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_service_1.ClientService,
        jwt_1.JwtService,
        two_factor_auth_service_1.TwoFactorAuthService])
], AuthService);
//# sourceMappingURL=auth.service.js.map