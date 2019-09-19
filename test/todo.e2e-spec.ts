import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from '../src/todos/todos.service';
import { AppModule } from './../src/app.module';

import * as request from 'supertest';
import * as faker from 'faker';

describe('TodoController (e2e)', () => {
  let app;
  let server;
  let service: TodosService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    service = moduleFixture.get<TodosService>(TodosService);
    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  it('/todos (POST)', () => {
    const todo = {
      name: faker.name.title(),
    };
    return request(server)
      .post('/todos')
      .send(todo)
      .expect(201)
      .then(async ({ body }) => {
        const todoFromDb = await service.getById(body.id);
        expect(body.name).toEqual(todo.name);
        expect(body).toEqual(todoFromDb);
      });
  });

  it('/todos (GET)', async () => {
    const todo = {
      name: faker.name.title(),
    };
    await service.create(todo);

    return request(server)
      .get('/todos')
      .expect(200)
      .then(({ body }) => {
        const res = body.find(item => item.name === todo.name);
        expect(res).not.toEqual(undefined);
      });
  });

  it('/todos/{id} (GET)', async () => {
    const todo = {
      name: faker.name.title(),
    };
    const { id } = await service.create(todo);

    return request(server)
      .get(`/todos/${id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.name).toEqual(todo.name);
      });
  });

  it('/todos/{id} (PUT)', async () => {
    const todo = {
      name: faker.name.title(),
    };
    const { id } = await service.create(todo);
    const newTodo = {
      name: faker.name.title(),
      status: faker.random.boolean(),
    };
    return request(server)
      .put(`/todos/${id}`)
      .send(newTodo)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({ id, ...newTodo });
      });
  });
});
