module.exports = class VoidError extends Error {
    constructor(message, fileName, lineNumber) {
        super(message, fileName, lineNumber)
    }

    get name() { return this.constructor.name }
}