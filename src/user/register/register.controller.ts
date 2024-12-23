import { Controller, Post, Req, Res } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterRequest, Response as RegisterResponse } from '../model/model';
import { Request, Response } from 'express';

@Controller('api/v1/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const registerRequest: RegisterRequest = request.body;
    const result = await this.registerService.register(registerRequest);
    const registerResponse: RegisterResponse<null> = {
      error: result.error,
      status: result.status,
      issues: result.issues,
      data: result.data,
    };
    response.status(result.status).send(registerResponse);
  }
}
