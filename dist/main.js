"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketAdapter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const errors_filter_1 = require("./errors.filter");
class SocketAdapter extends platform_socket_io_1.IoAdapter {
    createIOServer(port, options) {
        const server = super.createIOServer(port, Object.assign(Object.assign({}, options), { cors: {
                origin: true,
                methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PATCH'],
            } }));
        return server;
    }
}
exports.SocketAdapter = SocketAdapter;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    app.setGlobalPrefix('api', {
        exclude: [
            { path: '', method: common_1.RequestMethod.GET },
            { path: 'favicon.ico', method: common_1.RequestMethod.GET },
        ],
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'view'));
    app.setViewEngine('hbs');
    app.useGlobalFilters(new errors_filter_1.ErrorFilter());
    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PATCH'],
        credentials: true,
    });
    app.useWebSocketAdapter(new SocketAdapter(app));
    await app.listen(process.env.PORT || 8000);
}
bootstrap();
//# sourceMappingURL=main.js.map