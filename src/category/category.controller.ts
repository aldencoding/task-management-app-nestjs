import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Role } from '@prisma/client';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  @SetMetadata('roles', [Role.TEACHER])
  @UseGuards(RolesGuard)
  async getCategories() {
    return await this.categoryService.getCategories();
  }
  @Post('/')
  @SetMetadata('roles', [Role.TEACHER])
  @UseGuards(RolesGuard)
  async createCategory(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.createCategory(dto);
  }

  @Patch(':id')
  @SetMetadata('roles', [Role.TEACHER])
  @UseGuards(RolesGuard)
  async updateCategory(
    @Param('id') paramId: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return await this.categoryService.updateCategory(+paramId, dto);
  }

  @Delete(':id')
  @SetMetadata('roles', [Role.TEACHER])
  @UseGuards(RolesGuard)
  async deleteCategory(@Param('id') paramId: string) {
    return await this.categoryService.deleteCategory(+paramId);
  }
}
