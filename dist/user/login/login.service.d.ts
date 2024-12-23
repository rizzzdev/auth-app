import { PrismaService } from 'src/common/prisma/prisma.service';
import { ValidationService } from 'src/common/validation/validation.service';
import { LoginData, LoginRequest, Response } from '../model/model';
import { ConfigService } from '@nestjs/config';
export declare class LoginService {
    private readonly prismaService;
    private readonly validationService;
    private readonly configService;
    constructor(prismaService: PrismaService, validationService: ValidationService, configService: ConfigService);
    login(loginRequest: LoginRequest): Promise<Response<null | LoginData>>;
}
