"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = exports.initSwagger = exports.swaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('Reptimate Rest API')
    .setDescription('Swagger API description')
    .setVersion('1.0')
    .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    name: 'JWT',
    in: 'header',
}, 'accessToken')
    .build();
const initSwagger = async (app) => {
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, exports.swaggerConfig);
    swagger_1.SwaggerModule.setup('api-docs', app, swaggerDocument, exports.swaggerOptions);
};
exports.initSwagger = initSwagger;
exports.swaggerOptions = {
    swaggerOptions: {
        defaultModelsExpandDepth: 1,
        docExpansion: 'none',
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
        displayRequestDuration: true,
        showCommonExtensions: true,
        showExtensions: true,
    },
};
//# sourceMappingURL=swagger-config.js.map