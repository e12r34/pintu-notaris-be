import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  private todos = [];

  findAll() {
    return this.todos;
  }

  findOne(id: string) {
    return this.todos.find(todo => todo.id === id);
  }

  create(data) {
    const todo = { id: Date.now().toString(), ...data };
    this.todos.push(todo);
    return todo;
  }

  update(id: string, data) {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) {
      return null; // Handle not found
    }
    this.todos[index] = { ...this.todos[index], ...data };
    return this.todos[index];
  }

  remove(id: string) {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) {
      return null; // Handle not found
    }
    const deleted = this.todos.splice(index, 1);
    return deleted[0];
  }
}
