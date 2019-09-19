import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

describe('TodosService', () => {
  let service: TodosService;
  const mocks = {
    save: (todo: CreateTodoDto) => todo,
    find: () => {
      return [
        {
          id: 4,
          name: 'One',
          status: false,
        },
        {
          id: 5,
          name: 'Two',
          status: false,
        },
      ];
    },
    update: (id: number, todo: UpdateTodoDto) => new Promise(resolve => {}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(TodoEntity),
          useValue: mocks,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create todo', async () => {
    const value = { name: 'Test Todo' };
    const todo = await service.create(value);
    expect(value.name).toEqual(todo.name);
  });

  it('get all todos', async () => {
    const todos = await service.findAll();
    expect(todos).toEqual(mocks.find());
  });

  it('update todo', async () => {
    const value = { name: 'Test Todo', status: false };
    const todo = await service.updateById(1, value);
    expect(value.name).toEqual(todo.name);
  });
});
