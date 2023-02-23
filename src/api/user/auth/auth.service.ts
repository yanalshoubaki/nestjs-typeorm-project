import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/api/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from './auth.dto';
import { AuthHelper } from './auth.helper';
import { setResponse } from '@common/helper';
import { Response } from 'types/general';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<Response<User>> {
    try {
      const { name, email, password }: RegisterDto = body;
      let user: User = await this.repository.findOne({ where: { email } });

      if (user) {
        return setResponse<User>(HttpStatus.CONFLICT, 'User already exists');
      }

      user = new User();

      user.name = name;
      user.email = email;
      user.password = this.helper.encodePassword(password);

      this.repository.save(user);
      return setResponse<User>(
        HttpStatus.OK,
        'User updated successfully',
        user,
      );
    } catch (error) {
      return setResponse<User>(
        error.status || HttpStatus.BAD_REQUEST,
        error.message || 'Something went wrong',
      );
    }
  }

  public async login(body: LoginDto): Promise<
    Response<{
      token: string;
      user: User;
    }>
  > {
    try {
      const { email, password }: LoginDto = body;
      const user: User = await this.repository.findOne({ where: { email } });
      const errorMessage = {
        message: 'No user found',
        data: {
          email,
        },
        status: HttpStatus.NOT_FOUND,
      };
      if (!user) {
        throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
      }

      const isPasswordValid: boolean = this.helper.isPasswordValid(
        password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
      }

      this.repository.update(user.id, { lastLoginAt: new Date() });
      return setResponse<{
        token: string;
        user: User;
      }>(HttpStatus.OK, 'User updated successfully', {
        token: this.helper.generateToken(user),
        user,
      });
    } catch (error) {
      return setResponse(
        error.status || HttpStatus.BAD_REQUEST,
        error.message || 'Something went wrong',
      );
    }
  }

  public async refresh(user: User): Promise<string> {
    this.repository.update(user.id, { lastLoginAt: new Date() });

    return this.helper.generateToken(user);
  }
}
