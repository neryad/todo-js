import { Todo } from './todo.class';

export class TodoList {
  constructor() {
    //this.todos = [];
    this.cargarEnLocalStorage();
  }

  nuevoTodo(todo) {
    this.todos.push(todo);
    this.guardarEnLocalStorage();
  }

  eliminarTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id != id);
    this.guardarEnLocalStorage();
  }

  marcarCompletado(id) {
    for (const todo of this.todos) {
      if (todo.id == id) {
        todo.completado = !todo.completado;
        this.guardarEnLocalStorage();
        break;
      }
    }
  }

  borrarCompletado() {
    this.todos = this.todos.filter((todo) => !todo.completado);
    this.guardarEnLocalStorage();
  }

  guardarEnLocalStorage() {
    localStorage.setItem('todo', JSON.stringify(this.todos));
  }

  cargarEnLocalStorage() {
    // if (localStorage.getItem('todo')) {
    //   this.todos = JSON.parse(localStorage.getItem('todo'));
    // } else {
    //   this.todos = [];
    // }

    this.todos = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];
    this.todos = this.todos.map((obj) => Todo.fromJson(obj));
  }
}
