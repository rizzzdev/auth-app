import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Response, Status } from '../model/model';

@Injectable()
export class LogoutService {
  constructor(private readonly prismaService: PrismaService) {}

  async logout(refreshToken: string): Promise<Response<null>> {
    if (!refreshToken) {
      return {
        error: true,
        status: Status.BAD_REQUEST,
        issues: {
          message: 'You do not logged in, please log in!',
        },
        data: null,
      };
    }

    try {
      const userRefreshToken = await this.prismaService.token.findFirst({
        where: {
          refreshToken: refreshToken,
        },
      });
      await this.prismaService.token.delete({
        where: {
          id: userRefreshToken.id,
        },
      });
      return {
        error: false,
        status: Status.OK,
        issues: null,
        data: null,
      };
    } catch {
      return {
        error: true,
        status: Status.BAD_REQUEST,
        issues: {
          message: 'You do not logged in, please log in!',
        },
        data: null,
      };
    }
  }
}
