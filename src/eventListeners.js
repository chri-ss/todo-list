import { Add, Remove ,projectButton, addProjectButton, projectName } from "./displayController";
import { project, projects } from './project.js';

const addProjectEventListener = () => {
    projectButton.addEventListener('click', () => {
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
        projects.push(newProject);
        Add.addProject(newProject);
        Remove.removeProjectForm();
    })
}

export { addProjectEventListener, addProjectSubmitEventListener }