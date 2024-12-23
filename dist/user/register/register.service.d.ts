import { ValidationService } from 'src/common/validation/validation.service';
import { RegisterRequest, Response } from '../model/model';
import { PrismaService } from 'src/common/prisma/prisma.service';
export declare class RegisterService {
    private readonly prismaService;
    private readonly validationService;
    constructor(prismaService: PrismaService, validationService: ValidationService);
    register(registerRequest: RegisterRequest): Promise<Response<null>>;
}
