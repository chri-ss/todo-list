import todo from './todofactory.js';
import project from './projectFactory.js';
import {addNav, addMain, addNavButtons, addModal} from './displayController.js';
import { addProjectEventListener } from './eventListeners.js';
import './style.css';
import './reset.css';

/*const newTodo = todo('stuff', 'do some stuff', '12/12/21', 'high');
const newerTodo = todo('some other stuff', 'do something better', '12/13/21', 'higher');
const newProject = project(newTodo, newerTodo);

console.log(newTodo);
console.log(newProject);*/

addNav();
addNavButtons();
addModal();
addMain();
addProjectEventListener();