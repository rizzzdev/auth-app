import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { Response as MiddlewareResponse, Status } from './model/model';
import { verify } from 'jsonwebtoken';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async use(request: Request, response: Response, next: () => void) {
    const accessToken = request?.headers?.authorization?.split(' ')[1];
    try {
      const payload = verify(
        accessToken,
        this.configService.get('ACCESS_TOKEN_SECRET_KEY'),
      );
      const username = payload['username'];

      const user = await this.prismaService.users.findFirst({
        where: {
          username,
        },
      });

      if (user.role !== 'ADMIN') {
        const middlewareResponse: MiddlewareResponse<null> = {
          error: true,
          status: Status.FORBIDDEN,
          issues: {
            message: 'Only user with role ADMIN can access this!',
          },
          data: null,
        };
        response.status(middlewareResponse.status).send(middlewareResponse);
      } else {
        next();
      }
    } catch {
      const middlewareResponse: MiddlewareResponse<null> = {
        error: true,
        status: Status.UNAUTHORIZED,
        issues: {
          message: "Your don't have access to this!",
        },
        data: null,
      };
      response.status(middlewareResponse.status).send(middlewareResponse);
    }
  }
}
