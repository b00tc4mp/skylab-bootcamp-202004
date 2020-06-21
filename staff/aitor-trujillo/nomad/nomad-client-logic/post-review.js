require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/function')
require('nomad-commons/polyfills/number')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (token, workspaceId, stars, text) {
    String.validate.notVoid(token)
    String.validate.notVoid(workspaceId)
    Number.validate(stars)
    String.validate.notVoid(text)

    const review = { workspaceId, stars, text }

    const headers = { Authorization: `Bearer ${token}`, 'Content-type': 'application/json' }

    return (async () => {
        try {
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