import { project, projects } from "./project";
import { kebabCase } from "./utils";

import updateIcon from './images/2x/baseline_update_black_24dp.png'
import deleteIcon from './images/2x/baseline_delete_black_24dp.png'
import rightArrow from './images/2x/baseline_arrow_right_black_24dp.png'
import downArrow from './images/2x/baseline_arrow_drop_down_black_24dp.png'

import updateIconSmall from './images/1x/baseline_update_black_24dp.png'
import deleteIconSmall from './images/1x/baseline_delete_black_24dp.png'
import rightArrowSmall from './images/1x/baseline_arrow_right_black_24dp.png'
import downArrowSmall from './images/1x/baseline_arrow_drop_down_black_24dp.png'

const body = document.querySelector('body')
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
const priority = document.createElement('select');
const low = document.createElement('option');
const medium = document.createElement('option');
const high = document.createElement('option');
low.textContent = 'low'
medium.textContent = 'medium';
high.textContent = 'high';
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
        const xButtonDiv = document.createElement('div');
        xButtonDiv.classList.add('x-button-div');
        const xButton = document.createElement('button');
        xButton.textContent = 'x'
        xButton.classList.add('x-button');
        xButtonDiv.appendChild(xButton);
        modal.appendChild(xButtonDiv);
        body.appendChild(modal);
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
        projectDiv.classList.add('project-div', `${kebabCase(project.projectName)}`);
        const projectTitle = document.createElement('div');
        projectTitle.classList.add('project-title');

        const projectTitleLeftDiv = document.createElement('div')
        projectTitleLeftDiv.classList.add('project-title');
        const projectDropdownArrow = new Image();
        projectDropdownArrow.src = rightArrow;
        projectDropdownArrow.classList.add('project-dropdown-arrow', `${projects.indexOf(project)}`);
        const projectTitleText = document.createElement('div');
        projectTitleText.textContent = project.projectName;
        projectTitleText.classList.add('project-title-text', `text${projects.indexOf(project)}`);

        const projectTitleRightDiv = document.createElement('div');
        projectTitleRightDiv.classList.add('project-title');
        const projectUpdateIcon = new Image();
        projectUpdateIcon.src = updateIcon;
        projectUpdateIcon.classList.add('project-update', `${projects.indexOf(project)}update`);
        const projectDeleteIcon = new Image();
        projectDeleteIcon.src = deleteIcon;
        projectDeleteIcon.classList.add('project-delete', `${projects.indexOf(project)}delete`);

        projectTitleLeftDiv.appendChild(projectDropdownArrow);
        projectTitleLeftDiv.appendChild(projectTitleText);

        projectTitleRightDiv.appendChild(projectUpdateIcon);
        projectTitleRightDiv.appendChild(projectDeleteIcon);

        projectTitle.appendChild(projectTitleLeftDiv);
        projectTitle.appendChild(projectTitleRightDiv);

        projectDiv.appendChild(projectTitle);
        main.appendChild(projectDiv);
    }

    static addProjectsToDropdown() {
        while (projectDropdown.firstChild) {
            projectDropdown.removeChild(projectDropdown.firstChild);
        }

        for (let i = 0; i < projects.length; ++i) {
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
        dueDate.type = 'date';
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
        priority.appendChild(low);
        priority.appendChild(medium);
        priority.appendChild(high);
        todoForm.appendChild(priorityLabel);
        todoForm.appendChild(priority);
        todoForm.appendChild(addTodoButton);
        modal.appendChild(todoForm);
        modal.classList.remove('hidden');
    }

    static revealHiddenTodos(children) {
        for(let i = 0; i < children.length; ++i)
        {
            if(children[i].classList.contains('hidden'))
            {
                children[i].classList.remove('hidden');
            }
        }
    }

    static addTodo(todo, projectDiv, projectIndex) {
        const projectDropdownArrow = document.querySelector('.project-dropdown-arrow');
        if (projectDropdownArrow.src === rightArrow) {
            projectDropdownArrow.src = downArrow;
        }

        Add.revealHiddenTodos(Array.from(projectDiv.childNodes));

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-div', `todo${projectIndex}`, `${kebabCase(todo.title)}`);

        const todoTitle = document.createElement('div');
        todoTitle.classList.add('todo-title');

        const todoTitleLeftDiv = document.createElement('div');
        todoTitleLeftDiv.classList.add('todo-title')
        const todoDropdownArrow = new Image();
        todoDropdownArrow.src = rightArrowSmall;
        todoDropdownArrow.classList.add('todo-dropdown-arrow', `${kebabCase(todo.title)}`);
        const todoTitleTextContainer = document.createElement('div');
        const todoTitleText = document.createElement('div');
        todoTitleText.textContent = todo.title;
        todoTitleTextContainer.appendChild(todoTitleText);
        todoTitleText.classList.add('todo-title-text');

        const todoTitleRightDiv = document.createElement('div');
        todoTitleRightDiv.classList.add('todo-title');
        const todoUpdateIcon = new Image();
        todoUpdateIcon.src = updateIconSmall;
        const todoDeleteIcon = new Image();
        todoUpdateIcon.classList.add('todo-update', `${projectIndex}update`, `${projects[projectIndex].todos.indexOf(todo)}todo`);
        todoDeleteIcon.src = deleteIconSmall;
        todoDeleteIcon.classList.add('todo-delete', `${projectIndex}delete`, `${kebabCase(todo.title)}`);

        const todoDescription = document.createElement('div');
        todoDescription.textContent = todo.description;
        todoDescription.classList.add(`sub${kebabCase(todo.title)}`, 'todo-sub', 'hidden', 'desc');
        const todoDueDate = document.createElement('div');
        todoDueDate.textContent = `Due: ${todo.dueDate}`;
        todoDueDate.classList.add(`sub${kebabCase(todo.title)}`, 'todo-sub', 'hidden', 'due');
        const todoPriority = document.createElement('div');
        todoPriority.textContent = `Priority: ${todo.priority}`;
        todoPriority.classList.add(`sub${kebabCase(todo.title)}`, 'todo-sub', 'hidden', 'prior');

        todoTitleLeftDiv.appendChild(todoDropdownArrow);
        todoTitleLeftDiv.appendChild(todoTitleTextContainer);

        todoTitleRightDiv.appendChild(todoUpdateIcon);
        todoTitleRightDiv.appendChild(todoDeleteIcon);

        todoTitle.appendChild(todoTitleLeftDiv);
        todoTitle.appendChild(todoTitleRightDiv);

        todoDiv.appendChild(todoTitle);
        todoDiv.appendChild(todoDescription);
        todoDiv.appendChild(todoDueDate);
        todoDiv.appendChild(todoPriority);
        projectDiv.appendChild(todoDiv);
    }

    static addTodoEditForm(div) {
        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        const todoEditForm = document.createElement('form');
        todoEditForm.classList.add('todo-edit-form');
        titleLabel.textContent = 'Title';
        descriptionLabel.textContent = 'Description';
        dueDateLabel.textContent = 'Due Date';
        priorityLabel.textContent = 'Priority';
        addTodoButton.textContent = 'Update';
        title.classList.add('title');
        description.classList.add('description');
        dueDate.classList.add('due-date');
        priority.classList.add('priority');
        addTodoButton.classList.add('update');
        const fields = [titleLabel, title, descriptionLabel, description, dueDateLabel, dueDate, priorityLabel, priority, addTodoButton];
        const priorities = [low, medium, high];
        priorities.forEach(prior => {
            priority.appendChild(prior);
        })
        dueDate.type = 'date';
        fields.forEach(field => {
            todoEditForm.appendChild(field);
        })
        div.appendChild(todoEditForm);
    }
}


class Remove {
    static removeProjectForm() {
        if (modal.contains(projectForm)) {
            modal.removeChild(projectForm);
        }
        projectName.value = '';
        modal.classList.add('hidden');
    }

    static removeTodoForm() {
        if (modal.contains(todoForm)) {
            modal.removeChild(todoForm);
        }
        const inputs = todoForm.childNodes;
        inputs.forEach(input => {
            input.value = '';
        })
        modal.classList.add('hidden');
    }

    static removeTodoEditForm(div) {
        const todoEditForm = document.querySelector('.todo-edit-form');
        if(div.contains(todoEditForm))
        {
            div.removeChild(todoEditForm);
        }
        div.style.display = 'block';
    }
}

class Toggle {
    static toggleArrow(arrow) {
        if(arrow.src === rightArrow)
        {
            arrow.src = downArrow;
        }
        else if(arrow.src === downArrow)
        {
            arrow.src = rightArrow;
        }
        else if(arrow.src === rightArrowSmall)
        {
            arrow.src = downArrowSmall;
        }
        else if(arrow.src === downArrowSmall)
        {
            arrow.src = rightArrowSmall;
        }
    }
}

const displayProjects = () => {
    if (localStorage[0]) {
        for (let i = 0; i < localStorage.length; ++i) {
            projects.push(JSON.parse(localStorage.getItem(i)));
        }
        for (let i = 0; i < projects.length; ++i) {
            Add.addProject(projects[i]);
            projects[i].todos.forEach(todo => {
                const projectDiv = document.querySelector(`.${kebabCase(projects[i].projectName)}`)
                Add.addTodo(todo, projectDiv, i);
            })
            const children = Array.from(document.querySelectorAll(`.todo${i}`))
            children.forEach(child => child.classList.add('hidden'));
            const projectDropdownArrows = document.querySelectorAll('.project-dropdown-arrow');
            projectDropdownArrows.forEach(arrow => arrow.src = rightArrow);
        }
    }
    else {
        projects.push(project('default'))
        Add.addProject(projects[0]);
    }
}


export {
    Add, Remove, Toggle, main, projectButton, addProjectButton, projectName, projectDropdown,
    todoButton, title, description, dueDate, priority, addTodoButton, displayProjects,
}
