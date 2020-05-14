
function retrieveCryptoHistory(id, callback) {
    String.isString(id)
    Function.validate(callback)

    const url = `https://api.coincap.io/v2/assets/${id}/history?interval=d1`
    const body = undefined
    const headers = { 'Content-type': 'application/json' }

    call('GET', url, body, headers, (error, status, response) => {

        if (error) return callback(error)

        if (status === 200) {
            let { data } = JSON.parse(response)
            data = data.slice(-200)
            data = data.map(item => {
                item = Number(item.priceUsd)
                return item
            })
            return callback(undefined, data)

        }

        if (status === 404) {
            const { error: notFoundError } = JSON.parse(response)
            return callback(new Error(notFoundError))
        }

        callback(new Error('server error'))
    })
}