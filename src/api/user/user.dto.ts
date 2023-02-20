import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsOptional()
  public image?: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsEmail()
  public email: string;
}
