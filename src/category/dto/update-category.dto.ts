import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Nama kategori setidaknya harus lebih dari 3 karakter',
  })
  readonly name: string;
}
