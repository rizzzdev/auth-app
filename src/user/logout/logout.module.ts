import { Module } from '@nestjs/common';
import { LogoutService } from './logout.service';
import { LogoutController } from './logout.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  providers: [LogoutService, PrismaService],
  controllers: [LogoutController],
})
export class LogoutModule {}
