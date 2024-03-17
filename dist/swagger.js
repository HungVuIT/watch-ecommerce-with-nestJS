"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const setupSwagger = (app) => {
    const configService = app.get(config_1.ConfigService);
    const config = new swagger_1.DocumentBuilder()
        .setTitle(configService.get('PROJECT_NAME'))
        .setDescription(`Api for ${configService.get('NODE_ENV')} - v${configService.get('VERSION')}`)
        .setVersion(process.env.VERSION)
        .addBearerAuth({ in: 'header', type: 'http' })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
};
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.js.map