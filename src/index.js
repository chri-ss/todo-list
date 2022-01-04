import { addbackAddTodo, projects } from './project.js';
import { Add, addProjectButton, displayProjects } from './displayController.js';
import { addProjectEventListener, addProjectSubmitEventListener, addTodoEventListener, addTodoSubmitEventListener, 
    addTodoToggleEventListener, addProjectToggleEventListener, addDeleteProjectEventListener, 
    addTodoDeleteEventListener, AddProjectUpdateEventListener, addTodoUpdateEventListener} from './eventListeners.js';
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
addTodoDeleteEventListener();
AddProjectUpdateEventListener();
addTodoUpdateEventListener();
displayProjects();
addbackAddTodo();
console.log(projects);