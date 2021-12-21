import { project, projects } from "./project";
import todo from "./todo";
import { kebabCase } from "./utils";

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

const projectLabel = document.createElement('label');
const titleLabel = document.createElement('label');
const descriptionLabel = document.createElement('label');
const dueDateLabel = document.createElement('label');
const priorityLabel = document.createElement('label');

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
        projectTitle.classList.add(`${kebabCase(project.projectName)}`)
        projectTitle.textContent = project.projectName;
        projectDiv.appendChild(projectTitle);
        main.appendChild(projectDiv);
    }

    static addProjectsToDropdown() {
        while(projectDropdown.firstChild)
        {
            projectDropdown.removeChild(projectDropdown.firstChild);
        }

        for(let i = 0; i < projects.length; ++i)
        {
            const newOption = document.createElement('option');
            newOption.textContent = projects[i].projectName;
            projectDropdown.appendChild(newOption);
        }
    }

    static addTodoForm = () => {
        todoForm.classList.add('todo-form');
        projectDropdown.classList.add('project-dropdown');
        title.classList.add('title');
        description.classList.add('description');
        dueDate.classList.add('due-date');
        priority.classList.add('priority');
        addTodoButton.classList.add('add-todo-button');
        addTodoButton.textContent = 'Add Todo';

        projectLabel.textContent = 'Project';
        titleLabel.textContent = 'Title';
        descriptionLabel.textContent = 'Description';
        dueDateLabel.textContent = 'Due Date';
        priorityLabel.textContent = 'Priority';

        todoForm.appendChild(projectLabel);
        todoForm.appendChild(projectDropdown);
        Add.addProjectsToDropdown();
        todoForm.appendChild(titleLabel);
        todoForm.appendChild(title);
        todoForm.appendChild(descriptionLabel);
        todoForm.appendChild(description);
        todoForm.appendChild(dueDateLabel);
        todoForm.appendChild(dueDate);
        todoForm.appendChild(priorityLabel);
        todoForm.appendChild(priority);
        todoForm.appendChild(addTodoButton);
        modal.appendChild(todoForm);
        modal.classList.remove('hidden');
    }

    static addTodo(todo, projectDiv) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-div');
        const todoTitle =  document.createElement('div');
        todoTitle.textContent = `title: ${todo.title}`;
        const todoDescription = document.createElement('div');
        todoDescription.textContent = todo.description;
        const todoDueDate =  document.createElement('div');
        todoDueDate.textContent = todo.dueDate;
        const todoPriority =  document.createElement('div');
        todoPriority.textContent = todo.priority;
        todoDiv.appendChild(todoTitle);
        todoDiv.appendChild(todoDescription);
        todoDiv.appendChild(todoDueDate);
        todoDiv.appendChild(todoPriority);
        projectDiv.appendChild(todoDiv);
    }
}


class Remove {
    static removeProjectForm() {
        if (modal.contains(projectForm))
        {
            modal.removeChild(projectForm);
        }
        projectName.value = '';
    }

    static removeTodoForm() {
        if (modal.contains(todoForm))
        {
            modal.removeChild(todoForm);
        }
        const inputs = todoForm.childNodes;
        inputs.forEach(input => {
            input.value = '';
        })
    }
}


export { Add, Remove, projectButton, addProjectButton, projectName,
 projectDropdown, todoButton, title, description, dueDate, priority, addTodoButton }
