/**
 * Creates challenge for student.
 * 
 * @param {string} initialCode -data to create challenge's info in api, code to help user start the challenge.
 * @param {string} description -data to create challenge's info in api, what the challenge consists of.
 * @param {string} difficulty -data to create challenge's info in api, the punctuation depends on it. 
 * @param {string} tests The tests that the user should pass to succeed in the challenge.
 *
 */
const context = require('./context')
const { utils: { call } } = require('code-this-commons')


module.exports = function ({initialCode, description, difficulty, tests}) {
    const body = JSON.stringify({initialCode, description, difficulty, tests}) 
    const headers = { 'Content-type': 'application/json' }
    
    return call(
        'POST',
        `${this.API_URL}/challenge`, body, headers)

        .then(({ status, body }) => {
            if (status === 201) return
            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)