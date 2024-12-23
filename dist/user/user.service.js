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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
const model_1 = require("./model/model");
const config_1 = require("@nestjs/config");
const jsonwebtoken_1 = require("jsonwebtoken");
let UserService = class UserService {
    constructor(prismaService, configService) {
        this.prismaService = prismaService;
        this.configService = configService;
    }
    async getAllUsers() {
        const users = await this.prismaService.users.findMany({
            include: {
                profile: true,
                posts: true,
                tokens: true,
            },
        });
        return {
            error: false,
            status: model_1.Status.OK,
            issues: null,
            data: { users },
        };
    }
    async getNewAccessToken(refreshToken) {
        try {
            const payload = (0, jsonwebtoken_1.verify)(refreshToken, this.configService.get('REFRESH_TOKEN_SECRET_KEY'));
            const id = payload['id'];
            const username = payload['username'];
            const newPayload = { id, username };
            const refreshTokenDB = await this.prismaService.token.findFirst({
                where: {
                    AND: {
                        userId: id,
                        refreshToken: refreshToken,
                    },
                },
            });
            if (!refreshTokenDB) {
                return {
                    error: true,
                    status: model_1.Status.BAD_REQUEST,
                    issues: {
                        message: 'Please log in!',
                    },
                    data: null,
                };
            }
            else {
                const newAccessToken = (0, jsonwebtoken_1.sign)(newPayload, this.configService.get('ACCESS_TOKEN_SECRET_KEY'));
                return {
                    error: false,
                    status: model_1.Status.OK,
                    issues: null,
                    data: { newAccessToken },
                };
            }
        }
        catch {
            return {
                error: true,
                status: model_1.Status.BAD_REQUEST,
                issues: {
                    message: 'Please log in!',
                },
                data: null,
            };
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map