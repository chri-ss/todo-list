import { Add, Remove, main, projectButton, addProjectButton, projectName, todoButton, 
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
        updateLocalStorage();
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
        Add.addTodo(newTodo, projectDiv, projectDropdown.selectedIndex);
        Remove.removeTodoForm();
        updateLocalStorage();
    })
}

const addTodoToggleEventListener = () => {
    main.addEventListener('click', (event) => {
        if(event.target.classList[0] === 'todo-dropdown-arrow')
        {
            if(event.target.src === rightArrowSmall)
            {
                event.target.src = downArrowSmall;
            }
            else if (event.target.src === downArrowSmall)
            {
                event.target.src = rightArrowSmall;
            }
            const todoDiv = ((event.target.parentElement).parentElement).parentElement;
            console.log(todoDiv);
            const children = Array.from(todoDiv.childNodes);
            children.forEach(child => {
                if(child.classList[0] === `sub${kebabCase(event.target.classList[1])}`)
                {
                    child.classList.toggle('hidden');
                }
            })
        }
    })
}

const addProjectToggleEventListener = () => {
    main.addEventListener('click', (event) => {
        if(event.target.classList[0] === 'project-dropdown-arrow');
        {
            if(event.target.src === rightArrow)
            {
                event.target.src = downArrow;
            }
            else if (event.target.src === downArrow)
            {
                event.target.src = rightArrow
            }
            const project = projects[event.target.classList[1]];
            console.log(project);
            const children = Array.from(document.querySelectorAll(`.todo${event.target.classList[1]}`));
            children.forEach(child => {
                if (child.classList.contains('todo-div'))
                {
                    child.classList.toggle('hidden');
                }
            })
        }
    })
}

const addDeleteProjectEventListener = () => {
    main.addEventListener('click', (event) => {
        if(event.target.classList[0] === 'project-delete')
        {
            if(projects.length === 1)
            {
                while(main.firstChild)
                {
                    main.removeChild(main.firstChild);
                }
                projects.shift();
                console.log(projects);
                updateLocalStorage();
            }
            else
            {
                const projectIndex = parseInt(event.target.classList[1]);
                const divToRemove = document.querySelector(`.${kebabCase(projects[projectIndex].projectName)}`);
                main.removeChild(divToRemove);
                projects.splice(projectIndex, 1);

                //to make last div removable
                const lastDiv = main.lastChild;
                const lastDeleteButton = lastDiv.querySelector('.project-delete');
                lastDeleteButton.classList.remove(lastDeleteButton.classList[1]);
                lastDeleteButton.classList.add(`${projects.length - 1}delete`);
        
                updateLocalStorage();
            }
        }
    })
}

const addTodoDeleteEventListener = () => {
    main.addEventListener('click', (event) => {
        if(event.target.classList[0] === 'todo-delete')
        {
            const projectIndex = parseInt(event.target.classList[1]);
            const projectToRemoveFrom = projects[projectIndex];
            const projectTodosToRemoveFrom = projectToRemoveFrom.todos;
            const divToRemoveFrom = document.querySelector(`.${projectToRemoveFrom.projectName}`)

            projectTodosToRemoveFrom.forEach(todo => {
                if(todo.title === event.target.classList[2])
                {
                    const todoIndex = (projectTodosToRemoveFrom.indexOf(todo));
                    projectTodosToRemoveFrom.splice(todoIndex, 1);
                    const divToRemove = document.querySelector(`.${todo.title}`);
                    divToRemoveFrom.removeChild(divToRemove);
                    updateLocalStorage();
                }
            })
        }
    })
}

const AddProjectUpdateEventListener = () => {
    main.addEventListener('click', (event) => {
        if(event.target.classList[0] === 'project-update')
        {
            const projectIndex = parseInt(event.target.classList[1]);
            const projectTitleDiv = (event.target.parentElement).parentElement;
            const children = Array.from(projectTitleDiv.childNodes);

            children.forEach(child => {
                let grandChildren = Array.from(child.childNodes);
                grandChildren.forEach(grandChild => {
                    if (grandChild.classList[1] === `text${projectIndex}`)
                    {
                        const newInput = document.createElement('input');
                        child.replaceChild(newInput, grandChild)
                        newInput.addEventListener('keyup', (e) => {
                            if ('Enter' === e.key)
                            {
                                if(newInput.value === '')
                                {
                                    newInput.value = grandChild.textContent;
                                }
                                grandChild.textContent = newInput.value;
                                projectTitleDiv.parentElement.classList.remove(projectTitleDiv.classList[1]);
                                projectTitleDiv.parentElement.classList.add(newInput.value);
                                projects[projectIndex].projectName = newInput.value;
                                updateLocalStorage();
                                child.replaceChild(grandChild, newInput);
                            }
                        })
                    }
                })
            })
        }
    })
}

const addTodoUpdateEventListener = () => {
    main.addEventListener('click', (e) => {
        if(e.target.classList[0] === 'todo-update')
        {
            const projectIndex = parseInt(e.target.classList[1]);
            const todoIndex = parseInt(e.target.classList[2]);
            const todoToUpdate = projects[projectIndex].todos[todoIndex];
            console.log(todoToUpdate);
            const todoDiv = ((e.target.parentElement).parentElement).parentElement;
            const children = Array.from(todoDiv.querySelectorAll('.todo-div *'));
            console.log(todoDiv)
            
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
                        todoToUpdate.title = title.value;
                        divToAdd.textContent = todoToUpdate.title;
                        titleParent.replaceChild(divToAdd, child);
                    }
                    else if(child.classList.contains('desc'))
                    {
                        const divToAdd = document.createElement('div');
                        todoToUpdate.description = description.value;
                        divToAdd.textContent = todoToUpdate.description;
                        divToAdd.classList.add(`sub${todoToUpdate.title}`, 'todo-sub', 'desc');
                        todoDiv.replaceChild(divToAdd, child);

                    }
                    else if(child.classList.contains('due'))
                    {
                        const divToAdd = document.createElement('div');
                        todoToUpdate.dueDate = dueDate.value;
                        divToAdd.textContent = todoToUpdate.dueDate;
                        divToAdd.classList.add(`sub${todoToUpdate.title}`, 'todo-sub', 'due');
                        todoDiv.replaceChild(divToAdd, child);
                    }
                    else if(child.classList.contains('prior'))
                    {
                        const divToAdd = document.createElement('div');
                        todoToUpdate.priority = priority.value;
                        divToAdd.textContent = todoToUpdate.priority;
                        divToAdd.classList.add(`sub${todoToUpdate.title}`, 'todo-sub', 'prior');
                        todoDiv.replaceChild(divToAdd, child);
                    }
                    children.forEach(child => {
                        child.classList.remove('hidden');
                    })
                    Remove.removeTodoEditForm(todoDiv);
                })
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
            
        }
    })
}

export { addProjectEventListener, addProjectSubmitEventListener, addTodoEventListener, addTodoSubmitEventListener, 
    addTodoToggleEventListener, addProjectToggleEventListener, addDeleteProjectEventListener, addTodoDeleteEventListener,
AddProjectUpdateEventListener, addTodoUpdateEventListener, deleteModalEventListener}