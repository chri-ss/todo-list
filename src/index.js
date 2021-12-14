import todo from './todofactory.js';
import project from './projectFactory.js';

const newTodo = todo('stuff', 'do some stuff', '12/12/21', 'high');
const newProject = project(newTodo);

console.log(newTodo);
console.log(newProject);