/**
 * returns handled data recived from an api call
 * @param {string} name - crypto's name 
 * @param {callback} callback - returns the api's response
 */
function retrieveOhlc(name, callback) {

    Function.validate(callback)
    String.isString(name)

    const url = `https://api.coincap.io/v2/candles?exchange=poloniex&interval=h8&baseId=${name}&quoteId=tether`
    const headers = { 'Content-type': 'application/json' }
    const body = undefined

    call('GET', url, body, headers, (error, status, response) => {

        if (error) return callback(error)

        if (status === 200) {
            let { data } = JSON.parse(response)
            data = data.slice(-2)
            data = data[0]
            return callback(undefined, data)
        }

        callback(new Error('server error'))
    })
} 
/**
 * returns api's response
 * @callback callback
 * @param {string}  error - api's answer when an error exists.
 * @param {object[]} data - api's answer when succeeds, destructured from response.
 */