function retrieveCryptos(callback) {

    Function.validate(callback)

    // const url = 'https://api.coincap.io/v2/assets'
    const url = 'https://api.coincap.io/v2/assets?limit=12'
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