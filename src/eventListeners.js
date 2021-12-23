import { Add, Remove, Toggle, projectButton, addProjectButton, projectName, todoButton, 
projectDropdown, title, description, dueDate, priority, addTodoButton } from "./displayController";
import { project, projects } from './project.js';
import todo from "./todo";
import { kebabCase } from "./utils";

const addProjectEventListener = () => {
    projectButton.addEventListener('click', () => {
        Remove.removeTodoForm();
        Add.addProjectForm();
    });
}

const addProjectSubmitEventListener = () => {
    addProjectButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (projectName.value === '')
        {
            return;
        }
        let newProject = project(projectName.value);
        for(let i = 0; i < projects.length; ++i)
        {
            if(projects[i].projectName === newProject.projectName)
            {
                return;
            }
        }
        projects.push(newProject);
        Add.addProject(newProject);
        Remove.removeProjectForm();
    })
}

const addTodoEventListener = () => {
    todoButton.addEventListener('click', (e) => {
        Remove.removeProjectForm();
        Add.addTodoForm();
    })
}

const addTodoSubmitEventListener = () => {
    addTodoButton.addEventListener('click', (e) => {
        e.preventDefault()
        if(title.value === '' || description.value === '' || dueDate.value === '' || priority.value === '')
        {
            return;
        }
        const newTodo = todo(title.value, description.value, dueDate.value, priority.value);
        const newProject = projects[projectDropdown.selectedIndex];
        const projectDiv = document.querySelector(`.${kebabCase(newProject.projectName)}`)
        newProject.addTodo(newTodo);
        Add.addTodo(newTodo, projectDiv);
        Remove.removeTodoForm();
    })
}

const addTodoToggleEventListener = () => {
    const main = document.querySelector('.main');
    main.addEventListener('click', (event) => {
        if(event.target.className === 'todo-title')
        {
            const children = Array.from(event.target.childNodes);
            children.forEach(child => {
                if (child.classList.contains('todo-sub'))
                {
                    child.classList.toggle('hidden');
                }
            })
        }
    })
}

const addProjectToggleEventListener = () => {
    const main = document.querySelector('.main');
    main.addEventListener('click', (event) => {
        if(event.target.classList[0] === 'project-title');
        {
            const children = Array.from(event.target.childNodes);
            children.forEach(child => {
                if (child.classList.contains('todo-div'))
                {
                    child.classList.toggle('hidden');
                }
            })
        }
    })
}


export { addProjectEventListener, addProjectSubmitEventListener, addTodoEventListener, addTodoSubmitEventListener, 
    addTodoToggleEventListener, addProjectToggleEventListener}