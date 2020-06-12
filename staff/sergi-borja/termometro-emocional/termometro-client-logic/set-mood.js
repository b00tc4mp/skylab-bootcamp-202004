const { utils: { call } } = require('termometro-commons')
const context = require('./context')

module.exports = function (token, moodScore) {

    return call('GET', `${this.API_URL}/users`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(bodyAndState => {
            let body = JSON.parse(bodyAndState.body)
            let dateNow = new Date

            let { mood: moodList } = body

            for(let i=0; i<moodList.length; i++){
                delete moodList[i]._id
            }

            const newMood = {
                date: dateNow,
                score: moodScore
            }

            moodList.push(newMood)

            const finalObject = JSON.stringify(moodList)

            call('PATCH',
                `${this.API_URL}/users/`,
                `{ "mood": "${finalObject}" }`,
                { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` })
                .then(({ status, body }) => {
                    if (status === 201) return
                })
        })


}.bind(context)


