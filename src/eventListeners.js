import { projectButton, addProjectForm } from "./displayController";

const addProjectEventListener = () => {
    projectButton.addEventListener('click', () => {
        addProjectForm();
    });
}

export { addProjectEventListener }