module.exports = funcion (name){
    return class extends Error{
        constructor(message, fileName, lineNumber){
            super(message, fileName, lineNumber)
        }
        get name() { return name}
    }
}
