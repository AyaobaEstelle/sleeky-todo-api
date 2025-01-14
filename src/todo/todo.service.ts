import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Todo } from './schemas/todo.schema';

@Injectable()
export class TodoService {
    constructor(
        @InjectModel(Todo.name)
         private todoModel: mongoose.Model<Todo>,
    ) {}

    async findAllTodos(page: number = 1, limit: number = 10): Promise<{ data: Todo[]; total: number; currentPage: number; totalPages: number }> {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
          this.todoModel.find().skip(skip).limit(limit).exec(),
          this.todoModel.countDocuments().exec(), 
        ]);
      
        const totalPages = Math.ceil(total / limit); 
        return {
          data,
          total,
          currentPage: page,
          totalPages,
        };
      }

    async create(newTodo: Todo): Promise<Todo> {
        const createdTodo = await this.todoModel.create(newTodo)
        return createdTodo;
    };

    async findTodoById(todoId: string): Promise<Todo> {
        const foundTodo = await this.todoModel.findById(todoId)

        if(!Todo) {
            throw new NotFoundException(`Todo with ID ${todoId} not found`);
        }
        return foundTodo;
    };


    async updateTodoById(todoId: string, updatedTodoData: Partial<Todo>): Promise<Todo> {
        const updatedTodo = await this.todoModel.findByIdAndUpdate(todoId, updatedTodoData, {
             new: true ,
            runValidators: true,
         });

        return updatedTodo;
      }
      

    async deleteTodoById(todoId: string): Promise<Todo> {
        const deletedTodo = await this.todoModel.findByIdAndDelete(todoId);
        return deletedTodo;
      }
      
}
