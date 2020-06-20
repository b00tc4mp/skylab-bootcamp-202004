const { expect } = require('chai')

module.exports = function (userAnswer, expects, callback) {
    try {
        const answerWithTests = `
                ${userAnswer} 
                ${expects}
            `
        eval(answerWithTests)
        callback()
    } catch (error) {
        callback(error)
    }
}