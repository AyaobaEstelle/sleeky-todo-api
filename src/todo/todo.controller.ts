import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo-dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    async findAll(@Query('page') page: string, @Query('limit') limit: string) {
      const pageNumber = parseInt(page, 10) || 1;
      const limitNumber = parseInt(limit, 10) || 10;
      return this.todoService.findAllTodos(pageNumber, limitNumber);
    }
  

    @Post()
    async createTodo(
        @Body() 
        todo: CreateTodoDto
        ): Promise<Todo> {
            return this.todoService.create(todo);
        }

        @Get(':id')
        async getTodo(
            @Param('id')
            id: string
        ): Promise<Todo> { 
            return this.todoService.findTodoById(id); 
        }

        @Put(':id')
        async updateTodo(
            @Param('id')
            id: string,
            @Body()
            updateTodoDto: UpdateTodoDto
        ): Promise<Todo> {
            return this.todoService.updateTodoById(id, updateTodoDto);
        }

        @Delete(':id')
        async deleteTodo(
            @Param('id')
            id: string
        ): Promise<Todo> {
            return this.todoService.deleteTodoById(id);
        }
}
