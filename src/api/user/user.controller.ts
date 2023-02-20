import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Injectable,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Response } from 'src/types/general';
import { JwtAuthGuard } from './auth/auth.guard';

@Controller('user')
@Injectable({ scope: Scope.REQUEST })
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get('/')
  public getUsers(): Promise<Response<User[]>> {
    return this.service.getUsers();
  }

  @Get('/account')
  @UseGuards(JwtAuthGuard)
  public getAccount(@Request() request): Promise<Response<User>> {
    const user: User = request.user;
    return this.service.getUser(user.id);
  }

  @Get('/:id')
  public getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Response<User>> {
    return this.service.getUser(id);
  }

  @Post()
  public createUser(@Body() body: CreateUserDto): Promise<Response<User>> {
    return this.service.createUser(body);
  }

  @Patch(':id')
  public updateUser(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
  ): Promise<Response<User>> {
    return this.service.updateUser(id, body);
  }

  @Delete(':id')
  public deleteUser(@Param('id') id: number): Promise<Response<User>> {
    return this.service.deleteUser(id);
  }
}
