import { Body, Controller, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './create-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return createTodoDto;
  }
}
