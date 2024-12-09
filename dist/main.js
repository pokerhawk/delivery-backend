"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE, HEAD, PATCH, OPTIONS'],
        credentials: true,
    });
    await app.listen(8080)
        .then(() => console.log(`Application is running on port: 8080\napi-key: ${process.env.API_KEY}`));
}
bootstrap();
//# sourceMappingURL=main.js.map