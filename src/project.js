const project = (projectName, ...todos) => {

    const addTodo = (todo) => {
        todos.push(todo);
    }

    return { projectName, todos, addTodo }
}

const addbackAddTodo = (todos) => 
    projects.forEach(project => {
        project.addTodo = (todo) => {
            project.todos.push(todo);
        }
    })

const projects = [];

export { project, projects, addbackAddTodo };