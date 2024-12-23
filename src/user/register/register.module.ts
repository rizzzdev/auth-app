import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ValidationService } from 'src/common/validation/validation.service';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  providers: [RegisterService, PrismaService, ValidationService],
  controllers: [RegisterController],
})
export class RegisterModule {}
