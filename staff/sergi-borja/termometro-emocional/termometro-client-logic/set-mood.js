const { utils: { call } } = require('termometro-commons')
const context = require('./context')
const moment = require('moment')

/**
 * Get the user logged and updates it with the new mood score
 * 
 * @param {string} token The token.
 * @param {Number} moodScore The score user chose.
 * 
 * 
 * @throws {Error} If token or moodScore are invalid.
 */

module.exports = function (token, moodScore) {

    return call('GET', `${this.API_URL}/users`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            if (status === 200) {
                
                let _body = JSON.parse(body)
                const dateNow = moment().format("LLLL")

                let { mood } = _body

                for (let i = 0; i < mood.length; i++) {
                    delete mood[i]._id
                }

                const newMood = {
                    date: dateNow, 
                    score: moodScore
                }

                mood.push(newMood)
                return call('PATCH',
                    `${this.API_URL}/users`,
                    JSON.stringify({ mood }),
                    { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` })
                    .then((response) => {
                        if (response.status === 204){
                             return
                        } else {
                            const { error } = JSON.parse(body)

                            throw new Error(error)
                        }
                    })
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })


}.bind(context)


