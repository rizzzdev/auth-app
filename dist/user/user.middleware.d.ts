import { NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { PrismaService } from 'src/common/prisma/prisma.service';
export declare class UserMiddleware implements NestMiddleware {
    private readonly configService;
    private readonly prismaService;
    constructor(configService: ConfigService, prismaService: PrismaService);
    use(request: Request, response: Response, next: () => void): Promise<void>;
}
