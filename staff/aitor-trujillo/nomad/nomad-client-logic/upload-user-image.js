require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/function')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (photo) {

    let data = new FormData()
    data.append("image", {
        name: "image1",
        type: "image/jpeg",
        uri: photo.image1.uri,
    })

    return (async () => {
        try {
            const token = await this.storage.getItem('token')
            const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
            const result = await call(
                'POST',
                `${this.API_URL}/users/upload/`,
                data,
                headers
            )
            const { status } = result

            if (status === 200) {
                return true
            }
            else throw new Error('could not create workspace')
        } catch (error) {
            console.log(error) // TODO
        }
    })()
}.bind(context)