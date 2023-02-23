import { Response } from 'types/general';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

export interface UserInterface {
  getUsers: () => Promise<Response<User[]>>;
  getUser: (id: number) => Promise<Response<User>>;
  createUser: (body: CreateUserDto) => Promise<Response<User>>;
  updateUser: (id: number, body: UpdateUserDto) => Promise<Response<User>>;
  deleteUser: (id: number) => Promise<Response>;
}
