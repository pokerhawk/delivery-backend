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
exports.TwoFactorAuthService = void 0;
const common_1 = require("@nestjs/common");
const node_2fa_1 = require("node-2fa");
const client_service_1 = require("../../client/client.service");
let TwoFactorAuthService = class TwoFactorAuthService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateTwoFactorAuthSecret(loggedUserEmail) {
        const user = await this.prisma.user.findFirst({
            where: { email: loggedUserEmail },
        });
        if (user?.mfaEnabled)
            return;
        const otpAuth = (0, node_2fa_1.generateSecret)({
            name: "Projeto Delivery",
            account: user.email
        });
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                mfaSecret: otpAuth.secret,
                mfaEnabled: true
            }
        });
        return otpAuth;
    }
    async verifyTwoFaCode(code, user) {
        const isValid = (0, node_2fa_1.verifyToken)(user.mfaSecret, code, 4);
        if (isValid === null) {
            return false;
        }
        return true;
    }
};
exports.TwoFactorAuthService = TwoFactorAuthService;
exports.TwoFactorAuthService = TwoFactorAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], TwoFactorAuthService);
//# sourceMappingURL=two-factor-auth.service.js.map