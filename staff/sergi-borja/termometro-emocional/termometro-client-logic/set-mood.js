const { utils: { call } } = require('termometro-commons')
const context = require('./context')

module.exports = function (token, moodScore) {

    return call('GET', `${this.API_URL}/users`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(bodyAndState => {
            let body = JSON.parse(bodyAndState.body)
            let dateNow = new Date

            let { mood } = body

            for(let i=0; i<mood.length; i++){
                delete mood[i]._id
            }

            const newMood = {
                date: dateNow,
                score: moodScore
            }

            mood.push(newMood)


            call('PATCH',
                `${this.API_URL}/users/`,
                JSON.stringify({mood}),
                { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` })
                .then(({ status, body }) => {
                    if (status === 201) return
                })
        })


}.bind(context)


