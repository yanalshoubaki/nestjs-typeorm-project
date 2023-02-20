import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Response } from '@/@types/general';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get()
  public getUsers(): Promise<Response<User[]>> {
    return this.service.getUsers();
  }
  @Get(':id')
  public getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Response<User>> {
    return this.service.getUser(id);
  }

  @Post()
  public createUser(@Body() body: CreateUserDto): Promise<Response<User>> {
    return this.service.createUser(body);
  }
}
