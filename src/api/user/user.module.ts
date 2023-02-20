import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthModule } from './auth/auth.module';

@Module({
  providers: [UserService],
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
})
export class UserModule {}
