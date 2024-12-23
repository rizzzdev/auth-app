import { PrismaService } from 'src/common/prisma/prisma.service';
import { Response } from './model/model';
import { Users } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
export declare class UserService {
    private readonly prismaService;
    private readonly configService;
    constructor(prismaService: PrismaService, configService: ConfigService);
    getAllUsers(): Promise<Response<{
        users: Users[];
    }>>;
    getNewAccessToken(refreshToken: string): Promise<Response<null | {
        newAccessToken: string;
    }>>;
}
