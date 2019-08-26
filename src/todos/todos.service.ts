import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  findAll(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  create(crateTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoRepository.save(crateTodoDto);
  }

  updateById(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.todoRepository
      .update(id, updateTodoDto)
      .then(() => this.todoRepository.findOne(id));
  }
}
