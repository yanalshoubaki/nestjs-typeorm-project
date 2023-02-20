import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './user.dto'
import { User } from './user.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>

  public getUsers(): Promise<User[]> {
    return this.repository.find()
  }

  public getUser(id: number): Promise<User> {
    return this.repository.findOne({ where: { id } })
  }

  public createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User()
    user.username = body.username
    user.name = body.name
    user.email = body.email
    user.password = bcrypt.hashSync(body.password, 10)
    return this.repository.save(user)
  }
}
