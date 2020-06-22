require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/function')
require('nomad-commons/polyfills/number')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (workspaceId, stars, text) {
    String.validate.notVoid(workspaceId)
    Number.validate(stars)
    String.validate.notVoid(text)

    const review = { workspaceId, stars, text }


    return (async () => {
        try {
            const token = await this.storage.getItem('token')
            const headers = { Authorization: `Bearer ${token}`, 'Content-type': 'application/json' }
            const result = await call(
                'POST',
                `${this.API_URL}/reviews`,
                JSON.stringify(review),
                headers
            )

            const { status, body } = result

            if (status === 201) return
            else throw new Error('could not create review')
        } catch (error) {
            console.log(error) // TODO
        }
    })()
}.bind(context)