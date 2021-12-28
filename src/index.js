import todo from './todo.js';
import { addbackAddTodo, project, projects } from './project.js';
import { Add, Remove, displayProjects } from './displayController.js';
import { addProjectEventListener, addProjectSubmitEventListener, addTodoEventListener, addTodoSubmitEventListener, 
    addTodoToggleEventListener, addProjectToggleEventListener, addDeleteProjectEventListener} from './eventListeners.js';
import './style.css';
import './reset.css';

Add.addNav();
Add.addNavButtons();
Add.addModal();
Add.addMain();
addProjectEventListener();
addTodoEventListener();
addProjectSubmitEventListener();
addTodoSubmitEventListener();
addTodoToggleEventListener();
addProjectToggleEventListener();
addDeleteProjectEventListener();
displayProjects();
addbackAddTodo();
console.log(projects);