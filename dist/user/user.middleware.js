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
exports.UserMiddleware = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const model_1 = require("./model/model");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_service_1 = require("../common/prisma/prisma.service");
let UserMiddleware = class UserMiddleware {
    constructor(configService, prismaService) {
        this.configService = configService;
        this.prismaService = prismaService;
    }
    async use(request, response, next) {
        const accessToken = request.headers.authorization.split(' ')[1];
        try {
            const payload = (0, jsonwebtoken_1.verify)(accessToken, this.configService.get('ACCESS_TOKEN_SECRET_KEY'));
            const username = payload['username'];
            const user = await this.prismaService.users.findFirst({
                where: {
                    username,
                },
            });
            if (user.role !== 'ADMIN') {
                const middlewareResponse = {
                    error: true,
                    status: model_1.Status.FORBIDDEN,
                    issues: {
                        message: 'Only user with role ADMIN can access this!',
                    },
                    data: null,
                };
                response.status(middlewareResponse.status).send(middlewareResponse);
            }
            else {
                next();
            }
        }
        catch {
            const middlewareResponse = {
                error: true,
                status: model_1.Status.UNAUTHORIZED,
                issues: {
                    message: "Your don't have access to this!",
                },
                data: null,
            };
            response.status(middlewareResponse.status).send(middlewareResponse);
        }
    }
};
exports.UserMiddleware = UserMiddleware;
exports.UserMiddleware = UserMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], UserMiddleware);
//# sourceMappingURL=user.middleware.js.map