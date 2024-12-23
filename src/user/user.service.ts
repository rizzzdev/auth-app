import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Response, Status } from './model/model';
import { Users } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async getAllUsers(): Promise<Response<{ users: Users[] }>> {
    const users: Users[] = await this.prismaService.users.findMany({
      include: {
        profile: true,
        posts: true,
        tokens: true,
      },
    });
    return {
      error: false,
      status: Status.OK,
      issues: null,
      data: { users },
    };
  }

  async getNewAccessToken(
    refreshToken: string,
  ): Promise<Response<null | { newAccessToken: string }>> {
    try {
      const payload = verify(
        refreshToken,
        this.configService.get('REFRESH_TOKEN_SECRET_KEY'),
      );

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
          status: Status.BAD_REQUEST,
          issues: {
            message: 'Please log in!',
          },
          data: null,
        };
      } else {
        const newAccessToken = sign(
          newPayload,
          this.configService.get('ACCESS_TOKEN_SECRET_KEY'),
        );
        return {
          error: false,
          status: Status.OK,
          issues: null,
          data: { newAccessToken },
        };
      }
    } catch {
      return {
        error: true,
        status: Status.BAD_REQUEST,
        issues: {
          message: 'Please log in!',
        },
        data: null,
      };
    }
  }
}
