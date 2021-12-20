const project = (projectName, ...todos) => {

    const addTodo = (todo) => {
        todos.push(todo);
    }

    return { projectName, todos, addTodo }
}

const projects = [project('default')];

export { project, projects };