/**
 * Returns the api's answer from a  a query search.
 * @param {string} query - is the data requiered to make a search (also can be an empty string).
 * @param {callback} callback - returns api's answer when the call is done.
 */

function searchCryptos(query, callback) {

    Function.validate(callback)
    String.validate.alphabetic(query)


    const url = `https://api.coincap.io/v2/assets?search=${query}`
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
 * callback is a function inside searchCryptos and returns the api's response
 * @callback callback 
 * @param {object[]} data - is api's response to the query's search. Destructured from response.
 * @param {string} error - is api's response when an error exist.
 */