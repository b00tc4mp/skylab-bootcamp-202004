/**
 * Checks user credentials.
 * 
 * @param {string} value The value input. 
 * @param {string} simbol The simbol to substitut
 
 * @returns {string} if the input value is null,undefined or empty return the simbol
 * @throws {TypeError} If is a number or a function.
 */


function notNull(value,simbol) {

    if(typeof value === 'number') throw new TypeError(`${value} is a number.`);
    if(typeof value === 'function') throw new TypeError(`not admit a function.`);

    return value === null || value === '' || value === undefined ? simbol : value
}
