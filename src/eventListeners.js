import { projectButton, addProjectForm, addProjectButton, projectName, addProject, removeProjectForm } from "./displayController";
import { project } from './projectFactory.js';

const addProjectEventListener = () => {
    projectButton.addEventListener('click', () => {
        addProjectForm();
    });
}

const addProjectSubmitEventListener = () => {
    addProjectButton.addEventListener('click', (e) => {
        e.preventDefault();
        let newProject = project(projectName.value);
        addProject(newProject);
        removeProjectForm();
    })
}

export { addProjectEventListener, addProjectSubmitEventListener }