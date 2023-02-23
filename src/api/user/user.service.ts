import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { setResponse } from '@common/helper/response.helper';
import { Response } from 'types/general';
import { UserInterface } from './user.interface';

@Injectable()
export class UserService implements UserInterface {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  /**
   * Function used for getting users
   * @returns Promise<Response<User[]>>
   */
  public async getUsers(): Promise<Response<User[]>> {
    const user = await this.repository.find();
    return setResponse<User[]>(HttpStatus.OK, 'Users', user);
  }

  /**
   * Function used for getting user
   * @param id
   * @returns Promise<Response<User>>
   */
  public async getUser(id: number): Promise<Response<User>> {
    try {
      const user = await this.repository.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        return setResponse<User>(HttpStatus.NOT_FOUND, 'User not found');
      }
      return setResponse<User>(HttpStatus.OK, 'User found', user);
    } catch (error) {
      return setResponse<User>(HttpStatus.BAD_REQUEST, error.message);
    }
  }

  /**
   * Function used for creating user
   * @param body
   * @returns Promise<Response<User>>
   */
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

  /**
   * Function used for updating user
   * @param id
   * @param body
   * @returns Promise<Response<User>>
   */
  public async updateUser(
    id: number,
    body: UpdateUserDto,
  ): Promise<Response<User>> {
    try {
      const user: User = await this.repository.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        return setResponse<User>(HttpStatus.NOT_FOUND, 'User not found');
      }
      user.username = body.username;
      user.name = body.name;
      user.email = body.email;
      const updatedUser = await this.repository.save(user);
      return setResponse<User>(
        HttpStatus.OK,
        'User updated successfully',
        updatedUser,
      );
    } catch (error) {
      return setResponse<User>(HttpStatus.BAD_REQUEST, error.message);
    }
  }

  public async deleteUser(id: number): Promise<Response> {
    try {
      const user: User = await this.repository.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        return setResponse(HttpStatus.NOT_FOUND, 'User not found');
      }
      await this.repository.delete(id);
      return setResponse(HttpStatus.OK, 'User deleted successfully');
    } catch (error) {
      return setResponse(HttpStatus.BAD_REQUEST, error.message);
    }
  }
}
