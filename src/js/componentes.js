import { Todo } from '../class';
import { todoList } from '../index';

const divTodoList = document.querySelector('.todo-list');
const txtinput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
export const crearHtml = (todo) => {
  const htmlTodo = `
    <li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}">
		<div class="view">
		    <input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''} >
		    <label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>
    `;

  const div = document.createElement('div');
  div.innerHTML = htmlTodo;
  divTodoList.append(div.firstElementChild);
  return div.firstElementChild;
};

txtinput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13 && txtinput.value.length > 0) {
    const newTodo = new Todo(txtinput.value);
    todoList.nuevoTodo(newTodo);
    txtinput.value = '';
    crearHtml(newTodo);
    console.log(todoList);
  }
});

divTodoList.addEventListener('click', (event) => {
  const nombreElemento = event.target.localName;
  const todoElemento = event.target.parentElement.parentElement;
  const todoId = todoElemento.getAttribute('data-id');

  if (nombreElemento.includes('input')) {
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle('completed');
  } else if (nombreElemento.includes('button')) {
    todoList.eliminarTodo(todoId);

    divTodoList.removeChild(todoElemento);
  }
});

btnBorrar.addEventListener('click', () => {
  todoList.borrarCompletado();

  for (let i = divTodoList.children.length - 1; 1 >= 0; i--) {
    const elemento = divTodoList.children[i];

    if (elemento.classList.contains('completed')) {
      divTodoList.removeChild(elemento);
    }
  }
});
ulFilters.addEventListener('click', (event) => {
  const filtro = event.target.text;

  if (!filtro) return;

  anchorFiltros.forEach((elem) => elem.classList.remove('selected'));
  event.target.classList.add('selected');

  for (const element of divTodoList.children) {
    element.classList.remove('hidden');
    const completado = element.classList.contains('completed');

    switch (filtro) {
      case 'Pendientes':
        if (completado) {
          element.classList.add('hidden');
        }
        break;

      case 'Completados':
        if (!completado) {
          element.classList.add('hidden');
        }
        break;
    }
  }
});
