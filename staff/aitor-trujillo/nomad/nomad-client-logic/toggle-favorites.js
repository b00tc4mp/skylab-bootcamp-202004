require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/function')
require('nomad-commons/polyfills/number')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (workspaceId) {

    String.validate.notVoid(workspaceId)


    return (async () => {
        try {
            const token = await this.storage.getItem('token')
            const headers = { Authorization: `Bearer ${token}` }
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