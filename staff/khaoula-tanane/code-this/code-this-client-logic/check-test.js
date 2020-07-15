/**
 * Checks user's answer.
 * 
 * @param {string} userAnswer The user's answer to the challenge. 
 * @param {string} expects The tests that the user should pass to succeed in the challenge.
 * @param {callback} callback 
 * 
 */

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
/**
 * callback is a function inside check-test function, 
 * @callback callback
 */