import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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

  @Post('/create')
  async createTask(@Body() dto: CreateTaskDto) {
    return await this.tasksService.createTask(dto);
  }

  @Patch(':id')
  async updateTask(@Param('id') paramId: string, @Body() dto: UpdateTaskDto) {
    console.log(paramId, dto);
    return await this.tasksService.updateTask(+paramId, dto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') paramId: string) {
    return await this.tasksService.deleteTask(+paramId);
  }
}
