const { sucess, warning, error } = require('./Feedback.style');

function Feedback(message, level) {
    switch (level) {
        case 'warning':
            console.log(warning, message);
            break;
        case 'error':
            console.log(error, message);
            break;
        default:
            console.log(sucess, message)
            break;
    }
}

module.exports = Feedback