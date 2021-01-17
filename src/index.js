import { crearHtml, saludar } from './js/componentes.js';
import { Todo, TodoList } from './class';

import './styles.css';

export const todoList = new TodoList();
todoList.todos.forEach((todo) => crearHtml(todo));
