"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.SocketAdapter = void 0;
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var platform_socket_io_1 = require("@nestjs/platform-socket.io");
var path_1 = require("path");
var app_module_1 = require("./app.module");
var errors_filter_1 = require("./errors.filter");
var cors = require('cors');
var SocketAdapter = /** @class */ (function (_super) {
    __extends(SocketAdapter, _super);
    function SocketAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SocketAdapter.prototype.createIOServer = function (port, options) {
        var server = _super.prototype.createIOServer.call(this, port, __assign(__assign({}, options), { cors: {
                origin: true,
                methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PATCH']
            } }));
        return server;
    };
    return SocketAdapter;
}(platform_socket_io_1.IoAdapter));
exports.SocketAdapter = SocketAdapter;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var app;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core_1.NestFactory.create(app_module_1.AppModule)];
                case 1:
                    app = _a.sent();
                    //Thêm validator pipes global, đồng thời bỏ các trường ko cần thiết với whitelist true
                    app.useGlobalPipes(new common_1.ValidationPipe({
                        whitelist: true
                    }));
                    app.setGlobalPrefix('api', {
                        exclude: [
                            { path: '', method: common_1.RequestMethod.GET },
                            { path: 'favicon.ico', method: common_1.RequestMethod.GET },
                        ]
                    });
                    app.useStaticAssets(path_1.join(__dirname, '..', 'public'));
                    app.setBaseViewsDir(path_1.join(__dirname, '..', 'view'));
                    app.setViewEngine('hbs');
                    app.useGlobalFilters(new errors_filter_1.ErrorFilter());
                    // app.useWebSocketAdapter(new WsAdapter(app));
                    app.enableCors({
                        origin: true,
                        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PATCH'],
                        credentials: true
                    });
                    // app.use(cors());
                    // app.enableCors({
                    //     origin: 'http://localhost:3000',
                    //     methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PATCH'],
                    // });
                    app.useWebSocketAdapter(new SocketAdapter(app));
                    return [4 /*yield*/, app.listen(process.env.PORT || 8000)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
bootstrap();
