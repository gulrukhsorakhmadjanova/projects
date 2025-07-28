const toDoList = [
  { name: 'make dishes', dueDate: '2025-08-02' },
  { name: 'wash clothes', dueDate: '2025-08-12' }
];

renderToDoList();

function renderToDoList() {
  let toDoListHTML = ``;

  toDoList.forEach((toDoObject, index) => {
    const { name, dueDate } = toDoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button" data-index="${index}">Delete</button>
    `;
    toDoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = toDoListHTML;

  document.querySelectorAll('.js-delete-todo-button').forEach(button => {
    const index = parseInt(button.dataset.index);
    button.addEventListener('click', () => {
      toDoList.splice(index, 1);
      renderToDoList(); 
    });
  });
}

document.querySelector('.js-add-todo-button').addEventListener('click', () => {
  addToDo();
});

function addToDo() {
  const inputElement = document.querySelector('.js-name-input');
  const dateInputElement = document.querySelector('.js-due-date-input');
  const name = inputElement.value;
  const dueDate = dateInputElement.value;

  toDoList.push({ name, dueDate });
  inputElement.value = '';
  dateInputElement.value = '';
  renderToDoList();
}
