import { Controller, Post, Req, Res } from '@nestjs/common';
import {
  LoginData,
  LoginRequest,
  Response as LoginResponse,
} from '../model/model';
import { LoginService } from './login.service';
import { Request, Response } from 'express';

@Controller('api/v1/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const loginRequest: LoginRequest = request.body;
    const result = await this.loginService.login(loginRequest);
    const loginResponse: LoginResponse<LoginData> = {
      error: result.error,
      status: result.status,
      issues: result.issues,
      data: result?.data,
    };
    response
      .cookie('refresh-token', result?.data?.refreshToken ?? '', {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        // domain: 'http://localhost:3000',
      })
      .cookie('access-token', result?.data?.accessToken ?? '', {
        maxAge: 10 * 60 * 1000,
        httpOnly: true,
        // domain: 'http://localhost:3000',
      })
      .status(result.status)
      .send(loginResponse);
  }
}
