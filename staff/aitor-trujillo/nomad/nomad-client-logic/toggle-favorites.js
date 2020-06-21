require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/function')
require('nomad-commons/polyfills/number')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (token, workspaceId) {
    String.validate.notVoid(token)
    String.validate.notVoid(workspaceId)

    const headers = { Authorization: `Bearer ${token}` }

    return (async () => {
        try {
            const result = await call(
                'POST',
                `${this.API_URL}/favorites/add/${workspaceId}`,
                undefined,
                headers
            )

            const { status } = result

            if (status === 201) return
            else throw new Error('could not create workspace')
        } catch (error) {
            console.log(error) // TODO
        }
    })()
}.bind(context)