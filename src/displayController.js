const content = document.getElementById('content')
const nav = document.createElement('div');
const main = document.createElement('div');
const addProject = document.createElement('button');
const addTodo = document.createElement('button');

const addNav = () => {
    nav.classList.add('nav');
    content.appendChild(nav);
}

const addMain = () => {
    main.classList.add('main');
    content.appendChild(main);
}

const addNavButtons = () => {
    addProject.textContent = 'Add a new project';
    addTodo.textContent = 'Add a new Todo item';
    nav.appendChild(addProject);
    nav.appendChild(addTodo);
}

export { addNav, addMain, addNavButtons }
