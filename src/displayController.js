const content = document.getElementById('content')
const nav = document.createElement('div');
const modal = document.createElement('div');
const main = document.createElement('div');
const projectButton = document.createElement('button');
const todoButton = document.createElement('button');
const projectForm = document.createElement('form');
const projectName = document.createElement('input');
const addProjectButton = document.createElement('button');

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
    projectForm.classList.add('project-form');
    projectName.classList.add('project-name');
    addProjectButton.classList.add('add-project-button');
    addProjectButton.textContent = 'Add Project';
    projectForm.appendChild(projectName);
    projectForm.appendChild(addProjectButton);
    modal.appendChild(projectForm);
    modal.classList.remove('hidden');
}

const removeProjectForm = () => {
    projectForm.value = '';
    modal.classList.add('hidden');
}

const addProject = (project) => {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project-div');
    const projectTitle = document.createElement('div');
    projectTitle.classList.add('project-title');
    projectTitle.textContent = project.projectName;
    projectDiv.appendChild(projectTitle);
    main.appendChild(projectDiv);
}

export { projectButton, todoButton, addNav, addMain, addNavButtons, addModal, 
    addProjectForm, removeProjectForm, addProjectButton, projectName, addProject }
