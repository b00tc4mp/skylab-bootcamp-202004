const ConsoleLogger = require('./console-logger')

let instance // singleton pattern

module.exports = () => instance || (instance = new ConsoleLogger())
