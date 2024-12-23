import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ValidationService } from 'src/common/validation/validation.service';
import { LoginData, LoginRequest, Response, Status } from '../model/model';
import { Validation } from '../validation/validation';
import { ConfigService } from '@nestjs/config';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class LoginService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validationService: ValidationService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginRequest: LoginRequest): Promise<Response<null | LoginData>> {
    try {
      this.validationService.validate(Validation.LOGIN, loginRequest);
    } catch (error) {
      const response: Response<null> = {
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
      const response: Response<null> = {
        error: true,
        status: Status.BAD_REQUEST,
        issues: {
          message: `User with username ${loginRequest.username} is not exist, please register!`,
        },
        data: null,
      };
      return response;
    }

    const isPasswordCorrect = compareSync(loginRequest.password, user.password);
    if (!isPasswordCorrect) {
      const response: Response<null> = {
        error: true,
        status: Status.BAD_REQUEST,
        issues: {
          message: `Password is incorrect!`,
        },
        data: null,
      };
      return response;
    }

    const refreshToken = sign(
      {
        id: user.id,
        username: user.username,
      },
      this.configService.get('REFRESH_TOKEN_SECRET_KEY'),
      {
        expiresIn: 24 * 60 * 60,
      },
    );
    const accessToken = sign(
      {
        id: user.id,
        username: user.username,
      },
      this.configService.get('ACCESS_TOKEN_SECRET_KEY'),
      {
        expiresIn: 10 * 60,
      },
    );

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

    const response: Response<LoginData> = {
      error: false,
      status: Status.OK,
      issues: null,
      data: {
        username: loginRequest.username,
        refreshToken,
        accessToken,
      },
    };
    return response;
  }
}
