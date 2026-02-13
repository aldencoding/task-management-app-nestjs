import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Nama terlalu pendek' })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Password terlalu pendek' })
  readonly password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  readonly role: Role;
}
