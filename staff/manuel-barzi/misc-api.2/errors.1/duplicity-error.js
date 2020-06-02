module.exports = class DuplicityError extends Error {
    constructor(message, fileName, lineNumber) {
        super(message, fileName, lineNumber)
    }

    get name() { return this.constructor.name }
}