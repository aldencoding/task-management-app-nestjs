import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Role, Status } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTask() {
    return await this.prismaService.task.findMany();
  }
  async getTaskById(paramId: string) {
    const task = await this.prismaService.task.findUnique({
      where: { id: parseInt(paramId) },
      select: {
        title: true,
        author: { select: { user_name: true } },
        category: { select: { id: true, name: true } },
      },
    });

    if (!task) {
      throw new NotFoundException(
        `Task dengan ID: ${paramId} tidak ditemukan!`,
      );
    }

    return task;
  }

  async createTask(dto: CreateTaskDto) {
    const findCategory = await this.prismaService.category.findUnique({
      where: { id: dto.category_id },
    });
    if (!findCategory) {
      throw new NotFoundException(
        `Category dengan ID ${dto.category_id} tidak ditemukan!`,
      );
    }
    return await this.prismaService.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        category: { connect: { id: dto.category_id } },
        author: {
          connect: { id: dto.user_id },
        },
      },
      include: { author: true },
    });
  }

  async updateTask(paramId: number, dto: UpdateTaskDto, user: any) {
    let dataUpdate = {};
    //mengecek apakah ada task yang dicari
    const findTask = await this.prismaService.task.findUnique({
      where: { id: paramId },
    });
    if (!findTask) {
      throw new NotFoundException(`Task dengan ID ${paramId} tidak ditemukan!`);
    }

    // cek apakah status completed
    let finished_at: Date | null = null;
    if (dto.status) {
      if (dto.status === Status.COMPLETED) {
        finished_at = new Date();
      }
    }

    //memastikan hanya user tertentu yang bisa update
    if (user.role === Role.STUDENT) {
      dataUpdate = { status: dto.status };
    } else if (user.role === Role.TEACHER) {
      dataUpdate = { ...dto };
    }
    return await this.prismaService.task.update({
      where: { id: paramId },
      data: { ...dataUpdate, finished_at },
    });
  }

  async deleteTask(paramId: number) {
    const task = await this.prismaService.task.findUnique({
      where: { id: paramId },
    });

    if (!task) {
      throw new NotFoundException(
        `Task dengan ID: ${paramId} tidak ditemukan!`,
      );
    }
    await this.prismaService.task.delete({ where: { id: paramId } });
    return { message: `Task dengan ID ${paramId} berhasil dihapus` };
  }
}
