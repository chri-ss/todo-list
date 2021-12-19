import todo from './todofactory.js';
import { project, projects } from './project.js';
import { Add, Remove} from './displayController.js';
import { addProjectEventListener, addProjectSubmitEventListener } from './eventListeners.js';
import './style.css';
import './reset.css';

Add.addNav();
Add.addNavButtons();
Add.addModal();
Add.addMain();
addProjectEventListener();
addProjectSubmitEventListener();