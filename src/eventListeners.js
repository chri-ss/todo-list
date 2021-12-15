import { projectButton, addProject } from "./displayController";

const addProjectEventListener = () => {
    projectButton.addEventListener('click', () => {
        addProject();
    });
}

export { addProjectEventListener }