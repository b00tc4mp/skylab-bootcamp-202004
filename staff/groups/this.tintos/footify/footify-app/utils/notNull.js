function notNull(value) {

    if(typeof value === 'number') throw new TypeError(`${value} is a number.`);
    if(typeof value === 'function') throw new TypeError(`not admit a function.`);

    return value === null || value === '' || value === undefined ? '-' : value
}
