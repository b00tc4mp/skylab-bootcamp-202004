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

    const FgGreen = "\x1b[32m" // DEBUG
    const FgBlue = "\x1b[34m" // INFO
    const FgYellow = "\x1b[33m" // WARN
    const FgMagenta = "\x1b[35m" // ERROR
    const FgRed = "\x1b[31m" // FATAL

    const colors = [FgGreen, FgBlue, FgYellow, FgMagenta, FgRed]

    let __level__, __levels__

    return class FileLogger {
        static DEBUG = 0
        static INFO = 1
        static WARN = 2
        static ERROR = 3
        static FATAL = 4

        constructor(path) {
            __level__ = FileLogger.INFO

            __levels__ = Object.keys(FileLogger)
        }

        set level(level) {
            __level__ = level
        }

        log(message, level = __level__) {
            level >= __level__ && console.log(colors[level], `${__levels__[level]} ${formatter.format(new Date)} - ${message}\n`)
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
        }
    }
})()