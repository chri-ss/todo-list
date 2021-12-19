import todo from './todo.js';
import { project, projects } from './project.js';
import { Add, Remove } from './displayController.js';
import { addProjectEventListener, addProjectSubmitEventListener, addTodoEventListener } from './eventListeners.js';
import './style.css';
import './reset.css';

Add.addNav();
Add.addNavButtons();
Add.addModal();
Add.addMain();
addProjectEventListener();
addTodoEventListener();
addProjectSubmitEventListener();