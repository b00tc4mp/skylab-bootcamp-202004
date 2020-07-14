const FileLogger = require('./file-logger')

let instance // singleton pattern

module.exports = path => instance || (instance = new FileLogger(path))
