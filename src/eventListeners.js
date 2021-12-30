import { Add, Remove, Toggle, projectButton, addProjectButton, projectName, todoButton, 
projectDropdown, title, description, dueDate, priority, addTodoButton, displayProjects } from "./displayController";
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
    const main = document.querySelector('.main');
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
    const main = document.querySelector('.main');
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
    const main = document.querySelector('.main');
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
                console.log(projects);
                updateLocalStorage();
            }
        }
    })
}

const addTodoDeleteEventListener = () => {
    const main = document.querySelector('.main');
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

export { addProjectEventListener, addProjectSubmitEventListener, addTodoEventListener, addTodoSubmitEventListener, 
    addTodoToggleEventListener, addProjectToggleEventListener, addDeleteProjectEventListener, addTodoDeleteEventListener}