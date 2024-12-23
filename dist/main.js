"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: 'https://www.webtools.services/online-rest-api-client',
    });
    app.use(cookieParser());
    await app.listen(configService.get('PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map