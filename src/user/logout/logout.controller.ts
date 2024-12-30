import { Controller, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LogoutService } from './logout.service';
import { Response as LogoutResponse } from '../model/model';

@Controller('api/v1/logout')
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  @Delete()
  async logout(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const refreshToken = request.cookies['refresh-token'];
    const result = await this.logoutService.logout(refreshToken);
    const logoutResponse: LogoutResponse<null> = {
      error: result.error,
      issues: result.issues,
      status: result.status,
      data: result.data,
    };
    response
      .cookie('refresh-token', '')
      .cookie('access-token', '')
      .status(result.status)
      .send(logoutResponse);
  }
}
