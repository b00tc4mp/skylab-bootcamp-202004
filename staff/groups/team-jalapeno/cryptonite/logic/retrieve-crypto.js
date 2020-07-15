/**
 * This is a function that calls to API and retireves one single
 * crypto coin.
 * 
 * @param {string} name - ID of the coin to get from API
 * @param {callback} callback - Asynchronous function that returns the 
 *                              coin object.
 */

function retrieveCrypto(name, callback) {

    String.isString(name)
    Function.validate(callback)

    const url = `https://api.coincap.io/v2/assets/${name}`
    const headers = { 'Content-type': 'application/json' }
    const body = undefined

    call('GET', url, body, headers, (error, status, response) => {

        if (error) return callback(error)

        if (status === 200) {
            const { data } = JSON.parse(response)
            return callback(undefined, data)
        }

        if (status === 404) {
            const { error: notFoundError } = JSON.parse(response)
            return callback(new Error(notFoundError))
        }

        callback(new Error('server error'))
    })
}

/**
 * @callback
 *
 * @param {string} error - returns an error if the call has failed.
 * @param {object} data - returns an object with the data of the coin.
 */