import { Add, Remove ,projectButton, addProjectButton, projectName } from "./displayController";
import { project } from './projectFactory.js';

const addProjectEventListener = () => {
    projectButton.addEventListener('click', () => {
        Add.addProjectForm();
    });
}

const addProjectSubmitEventListener = () => {
    addProjectButton.addEventListener('click', (e) => {
        e.preventDefault();
        let newProject = project(projectName.value);
        Add.addProject(newProject);
        Remove.removeProjectForm();
    })
}

export { addProjectEventListener, addProjectSubmitEventListener }