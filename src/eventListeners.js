import { Add, Remove, Toggle, main, projectButton, addProjectButton, projectName, todoButton, 
projectDropdown, title, description, dueDate, priority, addTodoButton } from "./displayController";
import { project, projects } from './project.js';
import todo from "./todo";
import { kebabCase, updateLocalStorage } from "./utils";

import rightArrow from './images/2x/baseline_arrow_right_black_24dp.png'
import downArrow from './images/2x/baseline_arrow_drop_down_black_24dp.png'
import rightArrowSmall from './images/1x/baseline_arrow_right_black_24dp.png'
import downArrowSmall from './images/1x/baseline_arrow_drop_down_black_24dp.png'

const addProjectEventListener = () => {
    projectButton.addEventListener('click', () => {
        Remove.removeTodoForm();
        Add.addProjectForm();
    });
}

const projectSubmitEventListener = () => {
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
        updateLocalStorage();
        Add.addProject(newProject);
        Remove.removeOverlay();
        Remove.removeProjectForm();
    })
}

const addTodoEventListener = () => {
    todoButton.addEventListener('click', (e) => {
        Remove.removeProjectForm();
        Add.addTodoForm();
    })
}

const todoSubmitEventListener = () => {
    addTodoButton.addEventListener('click', (e) => {
        e.preventDefault()
        if(title.value === '' || description.value === '' || dueDate.value === '' || priority.value === '')
        {
            return;
        }
        const newTodo = todo(title.value, description.value, dueDate.value, priority.value);
        const newProject = projects[projectDropdown.selectedIndex];
        const projectDiv = document.querySelector(`[data-project='${kebabCase(newProject.projectName)}']`)
        newProject.addTodo(newTodo);
        Add.addTodo(newTodo, projectDiv, projectDropdown.selectedIndex);
        Remove.removeTodoForm();
        Remove.removeOverlay();
        updateLocalStorage();
    })
}

const todoToggleEventListener = () => {
    main.addEventListener('click', (event) => {
        if(event.target.classList[0] === 'todo-dropdown-arrow')
        {
            Toggle.toggleSmallArrow(event.target);
            Toggle.toggleTodoSubfields(event.target);
        }
    })
}

const projectToggleEventListener = () => {
    main.addEventListener('click', (event) => {
        if(event.target.classList[0] === 'project-dropdown-arrow');
        {
            Toggle.toggleBigArrow(event.target);
            Toggle.toggleTodos(event.target);
        }
    })
}

const deleteProjectEventListener = () => {
    main.addEventListener('click', (event) => {
        if(event.target.classList[0] === 'project-delete')
        {
            if(projects.length === 1)
            {
                Remove.clearMain();
                projects.shift();
                updateLocalStorage();
            }
            else
            {
                const projectIndex = parseInt(event.target.classList[1]);
                Remove.removeProject(event.target, projectIndex);
                projects.splice(projectIndex, 1);

                //to make last div removable
                Remove.removeLastProject();
        
                updateLocalStorage();
            }
        }
    })
}

const todoDeleteEventListener = () => {
    main.addEventListener('click', (event) => {
        if(event.target.classList[0] === 'todo-delete')
        {
            const projectIndex = parseInt(event.target.classList[1]);
            const projectToRemoveFrom = projects[projectIndex];
            const projectTodosToRemoveFrom = projectToRemoveFrom.todos

            projectTodosToRemoveFrom.forEach(todo => {
                if(todo.title === event.target.classList[2])
                {
                    const todoIndex = (projectTodosToRemoveFrom.indexOf(todo));
                    projectTodosToRemoveFrom.splice(todoIndex, 1);
                    Remove.removeTodo(projectToRemoveFrom, todo);
                    updateLocalStorage();
                }
            })
        }
    })
}

const projectUpdateEventListener = () => {
    main.addEventListener('click', (event) => {
        if(event.target.classList[0] === 'project-update')
        {
            const projectIndex = parseInt(event.target.classList[1]);
            const projectDiv = document.querySelector(`[data-project='${projects[projectIndex].projectName}']`)
            const children = Array.from(document.querySelectorAll(`[data-project='${projects[projectIndex].projectName}'] *`));
            console.log(projectDiv);
            children.forEach(child => {
                if (child.classList[1] === `text${projectIndex}`)
                {
                    const container = child.parentElement;
                    const newInput = document.createElement('input');
                    container.replaceChild(newInput, child)
                    newInput.addEventListener('keyup', (e) => {
                    if ('Enter' === e.key)
                    {
                        if(newInput.value === '')
                        {
                            newInput.value = child.textContent;
                        }
                        child.textContent = newInput.value;
                        projectDiv.setAttribute('data-project', `${kebabCase(newInput.value)}`);
                        container.replaceChild(child, newInput);
                        projects[projectIndex].projectName = newInput.value;
                        updateLocalStorage();
                    }
                    })
                }
            })
        }
    })
}

const todoUpdateEventListener = () => {
    main.addEventListener('click', (e) => {
        if(e.target.classList[0] === 'todo-update')
        {
            const projectIndex = parseInt(e.target.classList[1]);
            const todoIndex = parseInt(e.target.classList[2]);
            const todoToUpdate = projects[projectIndex].todos[todoIndex];

            const todoDiv = ((e.target.parentElement).parentElement).parentElement;
            const children = Array.from(todoDiv.querySelectorAll('.todo-div *'));
            
            children.forEach(child => {
                child.classList.add('hidden');
            })
            
            Add.addTodoEditForm(todoDiv);
            const title = todoDiv.querySelector('.title');
            const description = todoDiv.querySelector('.description');
            const dueDate = todoDiv.querySelector('.due-date');
            const priority = todoDiv.querySelector('.priority');

            const updateButton = todoDiv.querySelector('.update');
            updateButton.addEventListener('click', (e) => {
                e.preventDefault();
                children.forEach(child => {
                    if(child.classList.contains('todo-title-text'))
                    {
                        const titleParent = child.parentElement;
                        const divToAdd = document.createElement('div');
                        if(title.value === '')
                        {
                            return;
                        }
                        todoToUpdate.title = title.value;
                        divToAdd.textContent = todoToUpdate.title;
                        titleParent.replaceChild(divToAdd, child);
                    }
                    else if(child.classList.contains('desc'))
                    {
                        const divToAdd = document.createElement('div');
                        if(description.value === '')
                        {
                            return;
                        }
                        todoToUpdate.description = description.value;
                        divToAdd.textContent = todoToUpdate.description;
                        divToAdd.classList.add(`sub${todoToUpdate.title}`, 'todo-sub', 'desc');
                        todoDiv.replaceChild(divToAdd, child);

                    }
                    else if(child.classList.contains('due'))
                    {
                        const divToAdd = document.createElement('div');
                        if(dueDate.value === '')
                        {
                            return;
                        }
                        todoToUpdate.dueDate = dueDate.value;
                        divToAdd.textContent = todoToUpdate.dueDate;
                        divToAdd.classList.add(`sub${todoToUpdate.title}`, 'todo-sub', 'due');
                        todoDiv.replaceChild(divToAdd, child);
                    }
                    else if(child.classList.contains('prior'))
                    {
                        const divToAdd = document.createElement('div');
                        if(priority.value === '')
                        {
                            return;
                        }
                        todoToUpdate.priority = priority.value;
                        divToAdd.textContent = todoToUpdate.priority;
                        divToAdd.classList.add(`sub${todoToUpdate.title}`, 'todo-sub', 'prior');
                        todoDiv.replaceChild(divToAdd, child);
                    }
                    Add.revealHiddenTodos(children);
                    const todoDropdownArrow = todoDiv.querySelector('.todo-dropdown-arrow');
                    todoDropdownArrow.src = downArrowSmall;
                    Remove.removeTodoEditForm(todoDiv);
                })
                todoDiv.style.display
                updateLocalStorage();
            })
        }
    })
}

const deleteModalEventListener = () => {
    const body = document.querySelector('body');
    body.addEventListener('click', (e) => {
        if(e.target.classList[0] === 'x-button')
        {
            const modal = document.querySelector('.modal');
            modal.classList.add('hidden');
            const inputs = Array.from(modal.querySelectorAll('input'));
            inputs.forEach(input => {
                input.value = '';
            })
            Remove.removeOverlay();
        }
    })
}

export { addProjectEventListener, projectSubmitEventListener, addTodoEventListener, todoSubmitEventListener, 
    todoToggleEventListener, projectToggleEventListener, deleteProjectEventListener, todoDeleteEventListener,
projectUpdateEventListener, todoUpdateEventListener, deleteModalEventListener}