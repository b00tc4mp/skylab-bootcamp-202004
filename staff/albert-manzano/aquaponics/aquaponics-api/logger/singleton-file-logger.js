const FileLogger = require('./file-logger')

let instance 

module.exports = path => instance? instance : instance = new FileLogger(path)