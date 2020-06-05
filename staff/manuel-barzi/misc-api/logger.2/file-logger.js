const fs = require('fs')

module.exports = (() => { // module pattern
    const formatter = new Intl.DateTimeFormat('ca-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
    
    let __ws__, __level__, __levels__

    return class FileLogger {
        static DEBUG = 0
        static INFO = 1
        static WARN = 2
        static ERROR = 3
        static FATAL = 4

        constructor(path) {
            __ws__ = fs.createWriteStream(path, { flags: 'a' })

            __level__ = FileLogger.INFO

            __levels__ = Object.keys(FileLogger)
        }

        set level(level) {
            __level__ = level
        }

        log(message, level = __level__) {
            level >= __level__ && __ws__.write(`${__levels__[level]} ${formatter.format(new Date)} - ${message}\n`)
        }

        debug(message) {
            this.log(message, FileLogger.DEBUG)
        }

        info(message) {
            this.log(message, FileLogger.INFO)
        }

        warn(message) {
            this.log(message, FileLogger.WARN)
        }

        error(message) {
            this.log(message, FileLogger.ERROR)
        }

        fatal(message) {
            this.log(message, FileLogger.FATAL)
        }

        close() {
            __ws__.close()
        }
    }
})()