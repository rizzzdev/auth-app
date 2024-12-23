import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ValidationService } from 'src/common/validation/validation.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [LoginService, PrismaService, ValidationService, ConfigService],
  controllers: [LoginController],
})
export class LoginModule {}
