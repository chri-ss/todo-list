const content = document.getElementById('content')
const nav = document.createElement('div');
const modal = document.createElement('div');
const main = document.createElement('div');
const projectButton = document.createElement('button');
const todoButton = document.createElement('button');

const addNav = () => {
    nav.classList.add('nav');
    content.appendChild(nav);
}

const addModal = () => {
    modal.classList.add('modal');
    modal.classList.add('hidden');
    content.appendChild(modal);
}

const addMain = () => {
    main.classList.add('main');
    content.appendChild(main);
}

const addNavButtons = () => {
    projectButton.textContent = 'Add a new project';
    todoButton.textContent = 'Add a new Todo item';
    projectButton.classList.add('project-button');
    todoButton.classList.add('todo-button');
    nav.appendChild(projectButton);
    nav.appendChild(todoButton);
}

const addProjectForm = () => {
    const projectForm = document.createElement('form');
    projectForm.classList.add('project-form');
    const projectName = document.createElement('input');
    projectName.classList.add('project-name');
    const addProjectButton = document.createElement('button');
    addProjectButton.classList.add('add-project-button');
    addProjectButton.textContent = 'Add Project';
    projectForm.appendChild(projectName);
    projectForm.appendChild(addProjectButton);
    modal.appendChild(projectForm);
    modal.classList.remove('hidden');
}


export { projectButton, todoButton, addNav, addMain, addNavButtons, addModal, addProjectForm }
