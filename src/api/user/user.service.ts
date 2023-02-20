import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { setResponse } from '@common/helper/response.helper';
import { Response } from 'types/general';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async getUsers(): Promise<Response<User[]>> {
    const user = await this.repository.find();
    return setResponse<User[]>(HttpStatus.OK, 'Users', user);
  }

  public async getUser(id: number): Promise<Response<User>> {
    try {
      const user = await this.repository.findOne({
        where: {
          id,
        },
      });
      return setResponse<User>(HttpStatus.OK, 'User found', user);
    } catch (error) {
      return setResponse<User>(HttpStatus.BAD_REQUEST, error.message);
    }
  }

  public async createUser(body: CreateUserDto): Promise<Response<User>> {
    try {
      const user: User = new User();
      user.username = body.username;
      user.name = body.name;
      user.email = body.email;
      user.password = bcrypt.hashSync(body.password, 10);
      const createdUser = await this.repository.save(user);
      return setResponse<User>(
        HttpStatus.CREATED,
        'User created successfully',
        createdUser,
      );
    } catch (error) {
      return setResponse<User>(HttpStatus.BAD_REQUEST, error.message);
    }
  }
}
