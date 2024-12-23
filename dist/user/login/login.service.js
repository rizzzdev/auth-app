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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const validation_service_1 = require("../../common/validation/validation.service");
const model_1 = require("../model/model");
const validation_1 = require("../validation/validation");
const config_1 = require("@nestjs/config");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
let LoginService = class LoginService {
    constructor(prismaService, validationService, configService) {
        this.prismaService = prismaService;
        this.validationService = validationService;
        this.configService = configService;
    }
    async login(loginRequest) {
        try {
            this.validationService.validate(validation_1.Validation.LOGIN, loginRequest);
        }
        catch (error) {
            const response = {
                error: true,
                status: 200,
                issues: error.issues,
                data: null,
            };
            return response;
        }
        const user = await this.prismaService.users.findFirst({
            where: {
                username: loginRequest.username,
            },
        });
        if (!user) {
            const response = {
                error: true,
                status: model_1.Status.BAD_REQUEST,
                issues: {
                    message: `User with username ${loginRequest.username} is not exist, please register!`,
                },
                data: null,
            };
            return response;
        }
        const isPasswordCorrect = (0, bcrypt_1.compareSync)(loginRequest.password, user.password);
        if (!isPasswordCorrect) {
            const response = {
                error: true,
                status: model_1.Status.BAD_REQUEST,
                issues: {
                    message: `Password is incorrect!`,
                },
                data: null,
            };
            return response;
        }
        const refreshToken = (0, jsonwebtoken_1.sign)({
            id: user.id,
            username: user.username,
        }, this.configService.get('REFRESH_TOKEN_SECRET_KEY'), {
            expiresIn: 24 * 60 * 60,
        });
        const accessToken = (0, jsonwebtoken_1.sign)({
            id: user.id,
            username: user.username,
        }, this.configService.get('ACCESS_TOKEN_SECRET_KEY'), {
            expiresIn: 10 * 60,
        });
        await this.prismaService.users.update({
            where: {
                username: loginRequest.username,
            },
            data: {
                tokens: {
                    create: {
                        refreshToken,
                    },
                },
            },
        });
        const response = {
            error: false,
            status: model_1.Status.OK,
            issues: null,
            data: {
                username: loginRequest.username,
                refreshToken,
                accessToken,
            },
        };
        return response;
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        validation_service_1.ValidationService,
        config_1.ConfigService])
], LoginService);
//# sourceMappingURL=login.service.js.map