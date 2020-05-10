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