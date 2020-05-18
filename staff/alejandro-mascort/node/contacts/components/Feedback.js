const {warning, error, succes} = require('./Feedback.style')

function Feedback(message, level) {
    switch(level) {
        case 'warning':
            console.log(warning, message)
            break
        case 'error':
            console.log(error, message)
            break
        default:
            console.log(succes, message)
    }
}

module.exports = Feedback