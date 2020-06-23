require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/number')
require('nomad-commons/polyfills/function')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (workspaceId) {
    String.validate.notVoid(workspaceId)

    return (async () => {
        try {
            const token = await this.storage.getItem('token')
            const headers = { Authorization: `Bearer ${token}` }
            const result = await call(
                'GET',
                `${this.API_URL}/workspaces/${workspaceId}`,
                undefined,
                headers
            )
            const { status, body } = result

            if (status === 201) return JSON.parse(body)
            else {
                const { error } = JSON.parse(body)
                throw new Error(error)
            }
        } catch (error) {
            throw new Error(error.message)
        }
    })()
}.bind(context)