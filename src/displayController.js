const content = document.getElementById('content')
const nav = document.createElement('div');
const main = document.createElement('div');
const projectButton = document.createElement('button');
const todoButton = document.createElement('button');

const addNav = () => {
    nav.classList.add('nav');
    content.appendChild(nav);
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

const addProject = (projectName) => {
    const project = document.createElement('div');
    project.classList.add('project');
    const projectHeader = document.createElement('div');
    projectHeader.textContent = projectName;
    main.appendChild(project);
}



export { projectButton, todoButton, addNav, addMain, addNavButtons, addProject }
