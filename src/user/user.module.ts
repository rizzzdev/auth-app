import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
  imports: [RegisterModule, LoginModule],
})
export class UserModule {}
