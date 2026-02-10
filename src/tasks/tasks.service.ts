import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Status } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTask() {
    return await this.prismaService.task.findMany();
  }
  async getTaskById(paramId: string) {
    const task = await this.prismaService.task.findUnique({
      where: { id: parseInt(paramId) },
      select: { title: true, author: { select: { user_name: true } } },
    });

    if (!task) {
      throw new NotFoundException(
        `Task dengan ID: ${paramId} tidak ditemukan!`,
      );
    }

    return task;
  }
  async createTask(dto: CreateTaskDto) {
    return await this.prismaService.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        author: {
          connect: { id: dto.user_id },
        },
      },
      include: { author: true },
    });
  }
  async updateTask(paramId: number, dto: UpdateTaskDto) {
    // cek apakah status completed
    let finished_at: Date | null | undefined = undefined;
    if (dto.status) {
      if (dto.status === Status.COMPLETED) {
        finished_at = new Date();
      }
    }

    return await this.prismaService.task.update({
      where: { id: paramId },
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status as Status,
        finished_at: finished_at,
      },
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
