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
            const { status, body } = result

            if (status === 200) {
                return true
            }
            else {
                const { error } = JSON.parse(body)
                throw new Error(error)
            }
        } catch (error) {
            throw new Error(error.message)
        }
    })()
}.bind(context)