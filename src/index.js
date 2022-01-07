import { addbackAddTodo, projects } from './project.js';
import { Add, displayProjects } from './displayController.js';
import { addProjectEventListener, projectSubmitEventListener, addTodoEventListener, todoSubmitEventListener, 
    todoToggleEventListener, projectToggleEventListener, deleteProjectEventListener, 
    todoDeleteEventListener, projectUpdateEventListener, todoUpdateEventListener, deleteModalEventListener} from './eventListeners.js';
import './style.css';
import './reset.css';

Add.addNav();
Add.addNavButtons();
Add.addModal();
Add.addMain();
Add.addFooter();
addProjectEventListener();
addTodoEventListener();
projectSubmitEventListener();
todoSubmitEventListener();
projectToggleEventListener();
todoToggleEventListener();
deleteProjectEventListener();
todoDeleteEventListener();
projectUpdateEventListener();
todoUpdateEventListener();
deleteModalEventListener();
displayProjects();
addbackAddTodo();
console.log(projects);