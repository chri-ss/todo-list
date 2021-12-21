const kebabCase = (str) => {
    str = str.split(' ');
    str = str.join('-');
    return str;
}

export { kebabCase }