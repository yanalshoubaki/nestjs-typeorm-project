import {
  Body,
  Controller,
  Get,
  Inject,
  Injectable,
  Param,
  ParseIntPipe,
  Post,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Response } from 'src/types/general';
import { JwtAuthGuard } from './auth/auth.guard';

@Controller('user')
@Injectable({ scope: Scope.REQUEST })
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

  @Get('account')
  @UseGuards(JwtAuthGuard)
  public async getAccount(): Promise<string> {
    return 'account page';
  }
}
