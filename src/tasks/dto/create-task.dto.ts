import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateTaskDto {
  @IsInt()
  @IsNotEmpty()
  readonly user_id: number;

  @IsInt()
  @IsNotEmpty()
  readonly category_id: number;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'setidaknya harus lebih dari 5 karakter' })
  readonly description: string;
}
