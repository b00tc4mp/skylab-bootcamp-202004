require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/function')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (token, photo) {
    String.validate.notVoid(token)
    console.log(photo.image1)
    let data = new FormData()
    data.append("image", {
        name: "image1",
        type: "image/jpeg",
        uri: photo.image1.uri,
    })

    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }

    return (async () => {
        try {
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
            else throw new Error('could not create workspace')
        } catch (error) {
            console.log(error) // TODO
        }

    })()
}.bind(context)