import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { TodosService } from './todos.service';

@Module({
  controllers: [TodosController],
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [TodosService],
})
export class TodosModule {}
