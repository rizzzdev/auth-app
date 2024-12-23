import { Injectable } from '@nestjs/common';
import { ValidationService } from 'src/common/validation/validation.service';
import { RegisterRequest, Response, Status } from '../model/model';
import { Validation } from '../validation/validation';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { hashSync } from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validationService: ValidationService,
  ) {}

  async register(registerRequest: RegisterRequest): Promise<Response<null>> {
    try {
      this.validationService.validate(Validation.REGISTER, registerRequest);
    } catch (error) {
      const response: Response<null> = {
        error: true,
        status: Status.BAD_REQUEST,
        issues: error.issues,
        data: null,
      };
      return response;
    }

    try {
      await this.prismaService.users.create({
        data: {
          username: registerRequest.username,
          password: hashSync(registerRequest.password, 10),
          profile: {
            create: {
              firstName: registerRequest.firstName,
            },
          },
        },
      });

      const response: Response<null> = {
        error: false,
        status: Status.OK,
        issues: null,
        data: null,
      };
      return response;
    } catch {
      const response: Response<null> = {
        error: true,
        status: Status.BAD_REQUEST,
        issues: {
          message: `User with username ${registerRequest.username} is exist, please log in!`,
        },
        data: null,
      };
      return response;
    }
  }
}
