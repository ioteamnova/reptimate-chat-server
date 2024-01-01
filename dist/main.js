"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_config_1 = require("./core/swagger/swagger-config");
const logger_1 = require("./utils/logger");
async function bootstrap() {
    logger_1.logger.info(`====================== API Start - ${process.env.NODE_ENV} !!======================`);
    logger_1.logger.info(`====================== MYSQL_HOST Start - ${process.env.MYSQL_HOST} !!======================`);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, swagger_config_1.initSwagger)(app);
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map