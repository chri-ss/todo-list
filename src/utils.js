import { projects } from './project.js'

const kebabCase = (str) => {
    str = str.split(' ');
    str = str.join('-');
    return str;
}

const updateLocalStorage = () => {
    localStorage.clear();
    for(let i = 0; i < projects.length; ++i)
    {
        localStorage.setItem(i, JSON.stringify(projects[i]));
    }
}

export { kebabCase, updateLocalStorage }