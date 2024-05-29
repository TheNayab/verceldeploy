import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @InjectRepository(Task)
    private TaskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const task = await this.TaskRepository.save(createTaskDto);
      if (!task) {
        throw new HttpException(
          'Error while generating task : ',
          HttpStatus.BAD_REQUEST,
        );
      }

      return { success: true, message: 'task generated successfully', task };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error while creating task',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter: any = {},
  ): Promise<[Task[], number]> {
    try {
      const skip = (page - 1) * limit;
      const query = this.TaskRepository.createQueryBuilder('task');

      const { page: _, limit: __, ...actualFilter } = filter;
      if (Object.keys(actualFilter).length > 0) {
        Object.keys(actualFilter).forEach((key) => {
          query.andWhere(`task.${key} = :${key}`, { [key]: actualFilter[key] });
        });
      }

      query.skip(skip).take(limit);
      const [tasks, total] = await query.getManyAndCount();

      return [tasks, total];
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error while creating task',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      let task = await this.TaskRepository.findOneBy({ id });
      if (!task) {
        throw new HttpException('Task not found  ', HttpStatus.NOT_FOUND);
      }
      return { success: true, task };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error while creating task',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      let task = await this.TaskRepository.update(id, updateTaskDto);
      if (task.affected === 0) {
        throw new HttpException(
          'Error while updating task : ',
          HttpStatus.BAD_REQUEST,
        );
      }

      return { success: true, message: 'task updated successfully' };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error while creating task',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const task = await this.TaskRepository.delete(id);
      if (task.affected === 0) {
        throw new HttpException(
          'Error while Deleting task : ',
          HttpStatus.BAD_REQUEST,
        );
      }
      return { success: true, message: 'task deleted successfully' };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error while creating task',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
