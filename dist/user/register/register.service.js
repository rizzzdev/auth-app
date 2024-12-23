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
exports.RegisterService = void 0;
const common_1 = require("@nestjs/common");
const validation_service_1 = require("../../common/validation/validation.service");
const model_1 = require("../model/model");
const validation_1 = require("../validation/validation");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const bcrypt_1 = require("bcrypt");
let RegisterService = class RegisterService {
    constructor(prismaService, validationService) {
        this.prismaService = prismaService;
        this.validationService = validationService;
    }
    async register(registerRequest) {
        try {
            this.validationService.validate(validation_1.Validation.REGISTER, registerRequest);
        }
        catch (error) {
            const response = {
                error: true,
                status: model_1.Status.BAD_REQUEST,
                issues: error.issues,
                data: null,
            };
            return response;
        }
        try {
            await this.prismaService.users.create({
                data: {
                    username: registerRequest.username,
                    password: (0, bcrypt_1.hashSync)(registerRequest.password, 10),
                    profile: {
                        create: {
                            firstName: registerRequest.firstName,
                        },
                    },
                },
            });
            const response = {
                error: false,
                status: model_1.Status.OK,
                issues: null,
                data: null,
            };
            return response;
        }
        catch {
            const response = {
                error: true,
                status: model_1.Status.BAD_REQUEST,
                issues: {
                    message: `User with username ${registerRequest.username} is exist, please log in!`,
                },
                data: null,
            };
            return response;
        }
    }
};
exports.RegisterService = RegisterService;
exports.RegisterService = RegisterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        validation_service_1.ValidationService])
], RegisterService);
//# sourceMappingURL=register.service.js.map