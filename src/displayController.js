import { project } from "./project";
import todo from "./todo";

const content = document.getElementById('content')
const nav = document.createElement('div');
const modal = document.createElement('div');
const main = document.createElement('div');
const projectButton = document.createElement('button');
const todoButton = document.createElement('button');
const projectName = document.createElement('input');
const projectForm = document.createElement('form');
const todoForm = document.createElement('form');
const addProjectButton = document.createElement('button');

const projectDropdown = document.createElement('select');
const title = document.createElement('input');
const description = document.createElement('textarea');
const dueDate = document.createElement('input');
const priority = document.createElement('input');
const addTodoButton = document.createElement('button');

class Add {
    static addNav() {
        nav.classList.add('nav');
        content.appendChild(nav);
    }

    static addModal() {
        modal.classList.add('modal');
        modal.classList.add('hidden');
        content.appendChild(modal);
    }

    static addMain() {
        main.classList.add('main');
        content.appendChild(main);
    }

    static addNavButtons() {
        projectButton.textContent = 'Add a new project';
        todoButton.textContent = 'Add a new Todo item';
        projectButton.classList.add('project-button');
        todoButton.classList.add('todo-button');
        nav.appendChild(projectButton);
        nav.appendChild(todoButton);
    }

    static addProjectForm() {
        projectForm.classList.add('project-form');
        projectName.classList.add('project-name');
        addProjectButton.classList.add('add-project-button');
        addProjectButton.textContent = 'Add Project';
        projectForm.appendChild(projectName);
        projectForm.appendChild(addProjectButton);
        modal.appendChild(projectForm);
        modal.classList.remove('hidden');
    }

    static addProject(project) {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project-div');
        const projectTitle = document.createElement('div');
        projectTitle.classList.add('project-title');
        projectTitle.textContent = project.projectName;
        projectDiv.appendChild(projectTitle);
        main.appendChild(projectDiv);
    }

    static addTodoForm = () => {
        todoForm.classList.add('todo-form');
        title.classList.add('title');
        description.classList.add('discription');
        dueDate.classList.add('due-date');
        priority.classList.add('priority');
        addTodoButton.classList.add('add-todo-button');
        addTodoButton.textContent = 'Add Todo';
        todoForm.appendChild(projectDropdown);
        todoForm.appendChild(title);
        todoForm.appendChild(description);
        todoForm.appendChild(dueDate);
        todoForm.appendChild(priority);
        todoForm.appendChild(addTodoButton);
        modal.appendChild(todoForm);
        modal.classList.remove('hidden');
    }

    static addTodo(todo, project) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-div');
        const todoTitle =  document.createElement('div');
        todoTitle = todo.title;
        const todoDescription =  document.createElement('div');
        todoDescription = todo.description;
        const todoDueDate =  document.createElement('div');
        todoDueDate = todo.dueDate;
        const todoPriority =  document.createElement('div');
        todoPriority = todo.priority;
        todoDiv.appendChild(todoTitle);
        todoDiv.appendChild(todoDescription);
        todoDiv.appendChild(todoDueDate);
        todoDiv.appendChild(todoPriority);
        project.appendChild(todoDiv);
    }
}


class Remove {
    static removeProjectForm() {
        if (modal.contains(projectForm))
        {
            modal.removeChild(projectForm);
        }
    }

    static removeTodoForm() {
        if (modal.contains(todoForm))
        {
            modal.removeChild(todoForm);
        }
    }
}


export { Add, Remove, projectButton, addProjectButton, projectName,
 projectDropdown, todoButton, title, description, dueDate, priority }
