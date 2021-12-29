import { project, projects } from "./project";
import { kebabCase, updateLocalStorage, revealHiddenTodos } from "./utils";

import updateIcon from './images/2x/baseline_update_black_24dp.png'
import deleteIcon from './images/2x/baseline_delete_black_24dp.png'
import rightArrow from './images/2x/baseline_arrow_right_black_24dp.png'
import downArrow from './images/2x/baseline_arrow_drop_down_black_24dp.png'

import updateIconSmall from './images/1x/baseline_update_black_24dp.png'
import deleteIconSmall from './images/1x/baseline_delete_black_24dp.png'
import rightArrowSmall from './images/1x/baseline_arrow_right_black_24dp.png'
import downArrowSmall from './images/1x/baseline_arrow_drop_down_black_24dp.png'


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
        projectDiv.classList.add(`${kebabCase(project.projectName)}`);
        const projectTitle = document.createElement('div');
        projectTitle.classList.add('project-title');

        const projectTitleLeftDiv = document.createElement('div')
        projectTitleLeftDiv.classList.add('project-title');
        const projectDropdownArrow = new Image();
        projectDropdownArrow.src = rightArrow;
        projectDropdownArrow.classList.add('project-dropdown-arrow');
        projectDropdownArrow.classList.add(`${projects.indexOf(project)}`);
        const projectTitleText = document.createElement('div');
        projectTitleText.textContent = project.projectName;
        projectTitleText.classList.add('project-title-text');

        const projectTitleRightDiv = document.createElement('div');
        projectTitleRightDiv.classList.add('project-title');
        const projectUpdateIcon = new Image();
        projectUpdateIcon.src = updateIcon;
        const projectDeleteIcon = new Image();
        projectDeleteIcon.src = deleteIcon;
        projectDeleteIcon.classList.add('project-delete');
        projectDeleteIcon.classList.add(`${projects.indexOf(project)}delete`)

        
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

    static addTodo(todo, projectDiv, projectIndex) {
        const projectDropdownArrow = document.querySelector('.project-dropdown-arrow');
        if(projectDropdownArrow.src === rightArrow)
        {
            projectDropdownArrow.src = downArrow;
        }

        revealHiddenTodos(Array.from(projectDiv.childNodes));

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-div');
        todoDiv.classList.add(`todo${projectIndex}`)
        todoDiv.classList.add(`${todo.title}`);
        
        const todoTitle =  document.createElement('div');
        todoTitle.classList.add('todo-title');

        const todoTitleLeftDiv  = document.createElement('div');
        todoTitleLeftDiv.classList.add('todo-title')
        const todoDropdownArrow = new Image();
        todoDropdownArrow.src = rightArrowSmall;
        todoDropdownArrow.classList.add('todo-dropdown-arrow');
        todoDropdownArrow.classList.add(`${todo.title}`);
        const todoTitleText = document.createElement('div');
        todoTitleText.textContent = todo.title;
        todoTitleText.classList.add('todo-title-text');

        const todoTitleRightDiv = document.createElement('div');
        todoTitleRightDiv.classList.add('todo-title');
        const todoUpdateIcon = new Image();
        todoUpdateIcon.src = updateIconSmall;
        const todoDeleteIcon = new Image();
        todoDeleteIcon.src = deleteIconSmall;
        todoDeleteIcon.classList.add('todo-delete');
        todoDeleteIcon.classList.add(`${projectIndex}delete`)
        todoDeleteIcon.classList.add(`${todo.title}`);

        const todoDescription = document.createElement('div');
        todoDescription.textContent = todo.description;
        todoDescription.classList.add(`sub${todo.title}`);
        todoDescription.classList.add('todo-sub');
        todoDescription.classList.add('hidden');
        const todoDueDate =  document.createElement('div');
        todoDueDate.textContent = todo.dueDate;
        todoDueDate.classList.add(`sub${todo.title}`);
        todoDueDate.classList.add('todo-sub');
        todoDueDate.classList.add('hidden');
        const todoPriority =  document.createElement('div');
        todoPriority.textContent = todo.priority;
        todoPriority.classList.add(`sub${todo.title}`);
        todoPriority.classList.add('todo-sub');
        todoPriority.classList.add('hidden');

        todoTitleLeftDiv.appendChild(todoDropdownArrow);
        todoTitleLeftDiv.appendChild(todoTitleText);

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

const displayProjects = () => {
    if(localStorage[0])
    {
        for(let i = 0; i < localStorage.length; ++i)
        {
            projects.push(JSON.parse(localStorage.getItem(i)));
        }
        for(let i = 0; i < projects.length; ++i)
        {
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
    else
    {   
        projects.push(project('default'))
        Add.addProject(projects[0]);
    }
}


export { Add, Remove, projectButton, addProjectButton, projectName, projectDropdown, 
    todoButton, title, description, dueDate, priority, addTodoButton, displayProjects }
