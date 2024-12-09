"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const two_factor_auth_service_1 = require("./two-factor-auth.service");
const auth_controller_1 = require("./auth.controller");
const login_validation_middleware_1 = require("../../middlewares/login-validation.middleware");
const all_module_1 = require("../all.module");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const local_strategy_1 = require("./strategies/local.strategy");
const client_module_1 = require("../../client/client.module");
const apikey_strategy_1 = require("./strategies/apikey.strategy");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer.apply(login_validation_middleware_1.LoginValidationMiddleware).forRoutes('login');
    }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            client_module_1.ClientModule,
            all_module_1.AllModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '30d' }
            })
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, two_factor_auth_service_1.TwoFactorAuthService, jwt_strategy_1.JwtStrategy, local_strategy_1.LocalStrategy, apikey_strategy_1.ApiKeyStrategy],
        exports: [auth_service_1.AuthService, two_factor_auth_service_1.TwoFactorAuthService]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map