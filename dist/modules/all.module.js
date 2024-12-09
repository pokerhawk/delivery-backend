"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllModule = void 0;
const common_1 = require("@nestjs/common");
const client_module_1 = require("../client/client.module");
const user_service_1 = require("./User/user.service");
const user_controller_1 = require("./User/user.controller");
const sales_service_1 = require("./Sales/sales.service");
const sales_controller_1 = require("./Sales/sales.controller");
let AllModule = class AllModule {
};
exports.AllModule = AllModule;
exports.AllModule = AllModule = __decorate([
    (0, common_1.Module)({
        imports: [client_module_1.ClientModule],
        controllers: [user_controller_1.UserController, sales_controller_1.SalesController],
        providers: [user_service_1.UserService, sales_service_1.SalesService],
        exports: [user_service_1.UserService, sales_service_1.SalesService]
    })
], AllModule);
//# sourceMappingURL=all.module.js.map