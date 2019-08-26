import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoEntity } from './todo.entity';
import { ApiImplicitParam, ApiUseTags } from '@nestjs/swagger';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiUseTags('Todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  findAll(): Promise<TodoEntity[]> {
    return this.todoService.findAll();
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoService.create(createTodoDto);
  }

  @Put(':id')
  @ApiImplicitParam({ name: 'id' })
  update(
    @Param() params,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<TodoEntity> {
    return this.todoService.updateById(params.id, updateTodoDto);
  }
}
