import { Add, Remove ,projectButton, addProjectButton, projectName, todoButton, 
projectDropdown, title, description, dueDate, priority, addTodoButton } from "./displayController";
import { project, projects } from './project.js';
import todo from "./todo";

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
        console.log(projects);
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
        const projectDiv = document.querySelector(`.${newProject.projectName}`)
        newProject.addTodo(newTodo);
        Add.addTodo(newTodo, projectDiv);
        console.log(projects);
        
    })
}

export { addProjectEventListener, addProjectSubmitEventListener, addTodoEventListener, addTodoSubmitEventListener }