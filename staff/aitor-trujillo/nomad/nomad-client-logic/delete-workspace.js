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
                'DELETE',
                `${this.API_URL}/workspaces/${workspaceId}`,
                undefined,
                headers
            )
            const { status } = result
            if (status === 200) return
            else throw new Error('could not retrieve workspaces')
        } catch (error) {
            console.log(error) // TODO
        }
    })()
}.bind(context)