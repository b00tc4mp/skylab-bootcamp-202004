require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/number')
require('nomad-commons/polyfills/function')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (token, workspaceId) {

    String.validate.notVoid(token)
    String.validate.notVoid(workspaceId)

    const headers = { Authorization: `Bearer ${token}` }

    return (async () => {
        try {
            const result = await call(
                'GET',
                `${this.API_URL}/workspaces/${workspaceId}`,
                undefined,
                headers
            )
            const { status, body } = result

            if (status === 201) return JSON.parse(body)
            else throw new Error('could not retrieve workspaces')
        } catch (error) {
            console.log(error) // TODO
        }

    })()
}.bind(context)