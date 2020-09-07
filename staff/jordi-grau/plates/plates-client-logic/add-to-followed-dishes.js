require('plates-commons/polyfills/string')
const { utils: { call }} = require('plates-commons')
const context = require('./context')

module.exports = function (dishId, userId) {
    String.validate.notVoid(dishId)
    String.validate.notVoid(userId)
    const { token } = this.storage

    return ( call(
            'POST',
            `${this.API_URL}/users/dishes`,
            `{"_id": "${dishId}", "followers": "${userId}}`,
            {'Content-type': 'application/json', Authorization: `Bearer ${token}`}
        )
        .then(({status, body}) =>{
            if(status === 201) return

            const { error } = JSON.parse(body)

            throw new Error(error)
        })
    )
}.bind(context)
