const toDoList = document.querySelector('.todo__list');
const successBtn = document.querySelector('[data-action=done]');
const deleteBtn = document.querySelector('[data-action=delete]');
const formEl = document.querySelector('.todo__form');
const emptyList = document.querySelector('.todo__item--main');
const toDoInput = document.querySelector('.todo__input');
let tasks = [];

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach((task) => renderTask(task));
}

checkEmptyList();

formEl.addEventListener('submit', onFormSubmit);
toDoList.addEventListener('click', onDeleteBtn);
toDoList.addEventListener('click', onDoneBtn);

function onFormSubmit(event) {
  event.preventDefault();

  const taskText = event.currentTarget.elements.input.value
    .trim()
    .toLowerCase();
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  tasks.push(newTask);

  savaLocalStorage();

  renderTask(newTask);
  formEl.reset();
  toDoInput.focus();
  checkEmptyList();
}

function onDeleteBtn(event) {
  if (event.target.dataset.action !== 'delete') return;

  const parentNode = event.target.closest('.todo__item');
  const id = Number(parentNode.id);
  // удаление через findIndex
  //   const index = tasks.findIndex((task) => task.id === id);
  //   tasks.splice(index, 1);

  // Удаление через filter ======================

  tasks = tasks.filter((task) => task.id !== id);
  savaLocalStorage();

  parentNode.remove();
  checkEmptyList();
}

function onDoneBtn(event) {
  if (event.target.dataset.action !== 'done') return;

  const parentNode = event.target.closest('.todo__item');
  const id = Number(parentNode.id);

  const task = tasks.find((task) => task.id === id);
  console.log(task);

  task.done = !task.done;
  savaLocalStorage();
  const taskTitle = parentNode.querySelector('.todo__descr');
  taskTitle.classList.toggle('todo__descr--done');
}
function checkEmptyList() {
  if (tasks.length === 0) {
    const markUpEmptyList = `<li class="todo__item--main">
    <img
      class="todo__img"
      src="./img/leaf.png"
      width="200px"
      height="200px"
      alt=""
    />
    <p class="todo__item--text">Список дел пуст</p>
  </li>`;
    toDoList.insertAdjacentHTML('afterbegin', markUpEmptyList);
  }
  if (tasks.length > 0) {
    const emptyListEl = document.querySelector('.todo__item--main');
    emptyListEl ? emptyListEl.remove() : null;
  }
}
function savaLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function renderTask(task) {
  const cssClass = task.done ? 'todo__descr todo__descr--done' : 'todo__descr';

  const htmlMarkUp = `<li id='${task.id}' class="todo__item">
    <span class="${cssClass}">${task.text}</span>
    <div class="todo__controls">
      <button class="todo__btn" type="button" data-action="done">
        <img src="./img/success.svg" alt="done" width="18" height="18" />
      </button>
      <button class="todo__btn" type="button" data-action="delete">
        <img src="./img/cross.svg" alt="delete" width="18" height="18" />
      </button>
    </div>
  </li>`;
  toDoList.insertAdjacentHTML('beforeend', htmlMarkUp);
}
