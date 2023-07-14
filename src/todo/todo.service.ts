import { Injectable } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Romper la paciencia 1', done: false },
    { id: 2, description: 'Romper la paciencia 2', done: true },
    { id: 3, description: 'Romper la paciencia 3', done: true },
    { id: 4, description: 'Romper la paciencia 4', done: false },
  ];

  get totalTodos() {
    return this.todos.length;
  }

  get completedTodos() {
    return this.todos.filter((todo) => todo.done).length;
  }

  get pendingTodos() {
    return this.todos.filter((todo) => !todo.done).length;
  }

  findAll(statusArgs: StatusArgs) {
    const { status } = statusArgs;
    if (status !== undefined)
      return this.todos.filter((todo) => todo.done === status);

    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    this.todos.push(todo);

    return todo;
  }

  removeTodo(id: number) {
    const todo = this.findOne(id);

    this.todos = this.todos.filter((t) => t.id !== todo.id);

    return true;
  }

  update(updateTodoInput: UpdateTodoInput) {
    const todoToUpdate = this.findOne(updateTodoInput.id);

    if (updateTodoInput.description)
      todoToUpdate.description = updateTodoInput.description;

    if (updateTodoInput.done !== undefined)
      todoToUpdate.done = updateTodoInput.done;

    this.todos = this.todos.map((todo) =>
      todo.id === updateTodoInput.id ? todoToUpdate : todo,
    );

    return todoToUpdate;

    // const index = this.todos.findIndex(
    // (todo) => todo.id === updateTodoInput.id,
    // );
    //
    // if (index >= 0) {
    // return this.todos.splice(index, 1, updateTodoInput);
    // } else {
    // throw new NotFoundException(
    // `Todo with id ${updateTodoInput.id} not found`,
    // );
    // }
  }
}
