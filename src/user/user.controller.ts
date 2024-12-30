import { Controller, Get, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';

@Controller('api/v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-all-users')
  async getAllUsers(@Res() response: Response): Promise<void> {
    const result = await this.userService.getAllUsers();
    response.status(result.status).send(result);
  }

  @Get('get-new-access-token')
  async getNewAccessToken(@Req() request: Request, @Res() response: Response) {
    const refreshToken = request.cookies['refresh-token'];
    const result = await this.userService.getNewAccessToken(refreshToken);
    response
      .cookie('access-token', result.data.newAccessToken, {
        maxAge: 10 * 60 * 1000,
        httpOnly: true,
      })
      .status(result.status)
      .send(result);
  }
}
