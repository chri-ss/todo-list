const todo = (title, description, dueDate, priority) => {
    const getTitle = () => console.log(title);
    return {title, description, dueDate, priority, getTitle};
}

export default todo;