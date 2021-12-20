const project = (projectName, ...todos) => {
    return { projectName, todos }
}

const projects = [project('default')];

export { project, projects };