require('takemytask-commons/polyfills/string')
const { utils: { call } } = require('takemytask-commons')
const context = require('./context')

module.exports = function (userName, jobCategory, words) {

    String.validate.notVoid(words)

    return call('POST', `${this.API_URL}/worker/search`,
        `{ "userName": "${userName}", "jobCategory": "${jobCategory}", "words": "${words}" }`,
        {'Content-type': 'application/json'})
            .then(({status, body}) => {
                if (status === 200){

                    return  JSON.parse(body)

                }else {

                    const { error } = JSON.parse(body)
                    throw new Error (error)
                }
            })
    
}.bind(context)