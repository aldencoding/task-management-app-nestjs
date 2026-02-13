import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '@prisma/client';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard)
@Controller('task')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get('/')
  async getTask() {
    return await this.tasksService.getTask();
  }

  @Get(':id')
  async getTaskById(@Param('id') paramId: string) {
    return await this.tasksService.getTaskById(paramId);
  }

  @Post('/')
  @SetMetadata('roles', [Role.TEACHER])
  @UseGuards(RolesGuard)
  async createTask(@Body() dto: CreateTaskDto) {
    return await this.tasksService.createTask(dto);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') paramId: string,
    @Body() dto: UpdateTaskDto,
    @Req() req: any,
  ) {
    console.log(paramId, dto);
    return await this.tasksService.updateTask(+paramId, dto, req.user);
  }

  @Delete(':id')
  @SetMetadata('roles', [Role.TEACHER])
  @UseGuards(RolesGuard)
  async deleteTask(@Param('id') paramId: string) {
    return await this.tasksService.deleteTask(+paramId);
  }
}
