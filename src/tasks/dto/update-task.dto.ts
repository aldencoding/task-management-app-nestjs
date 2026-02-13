import { Status } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'setidaknya harus lebih dari 3 karakter' })
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Status, {
    message:
      'status harus berupa salah satu dari: PENDING, IN_PROGRESS, COMPLETED',
  })
  readonly status: Status;
}
