import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}
  async getCategories() {
    return await this.prismaService.category.findMany();
  }
  async createCategory(dto: CreateCategoryDto) {
    console.log({ ...dto });
    return await this.prismaService.category.create({
      data: { ...dto },
    });
  }
  async updateCategory(paramId: number, dto: UpdateCategoryDto) {
    const findCategory = await this.prismaService.category.findUnique({
      where: { id: paramId },
    });

    if (!findCategory) {
      throw new NotFoundException(
        `kategori dengan ID ${paramId} tidak ditemukan!`,
      );
    }
    return await this.prismaService.category.update({
      where: { id: paramId },
      data: { ...dto },
    });
  }
  async deleteCategory(paramId: number) {
    const category = await this.prismaService.category.findUnique({
      where: { id: paramId },
    });

    if (!category) {
      throw new NotFoundException(
        `Task dengan ID: ${paramId} tidak ditemukan!`,
      );
    }
    await this.prismaService.category.delete({ where: { id: paramId } });
    return { message: `Task dengan ID ${paramId} berhasil dihapus` };
  }
}
