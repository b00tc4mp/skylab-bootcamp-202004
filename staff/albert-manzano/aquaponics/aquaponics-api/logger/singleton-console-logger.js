const ConsoleLogger = require('./console-logger')

let instance

module.exports = () => instance? instance : instance = new ConsoleLogger()