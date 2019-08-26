import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './create-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  create(crateTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoRepository.save(crateTodoDto);
  }

  findAll(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }
}
