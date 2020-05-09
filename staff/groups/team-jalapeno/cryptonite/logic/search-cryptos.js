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