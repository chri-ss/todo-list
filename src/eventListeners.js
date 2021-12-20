import { Add, Remove ,projectButton, addProjectButton, projectName, todoButton, 
projectDropdown, title, description, dueDate, priority } from "./displayController";
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

export { addProjectEventListener, addProjectSubmitEventListener, addTodoEventListener }