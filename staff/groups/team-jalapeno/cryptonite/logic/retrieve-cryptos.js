/**
 * This is a function that calls to API and retireves
 * 12 most capitalized crypto coins.
 * 
 * @param {callback} callback - Asynchronous function that returns the 
 *                              12 coins array.
 */

function retrieveCryptos(callback) {
    Function.validate(callback)

    const url = 'https://api.coincap.io/v2/assets?&limit=12'
    const headers = { 'Content-type': 'application/json' }
    const body = undefined

    call('GET', url, body, headers, (error, status, response) => {

        if (error) return callback(error)

        if (status === 200) {
            const { data } = JSON.parse(response)
            return callback(undefined, data)
        }

        callback(new Error('server error'))
    })
}
/**
 * The function returns asynchronously the data.
 * @callback
 *
 * @param {string} error - returns an error if the call has failed.
 * @param {object} data - returns an array with the data of the coins.
 */