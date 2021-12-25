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

const revealHiddenTodos = (children) => {
    for(let i = 0; i < children.length; ++i)
    {
        if(children[i].classList.contains('hidden'))
        {
            children[i].classList.remove('hidden');
        }
    }
}

export { kebabCase, updateLocalStorage, revealHiddenTodos }