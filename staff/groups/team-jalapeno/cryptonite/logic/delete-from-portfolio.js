/**
 * @function deletePortfolioCrypto - removes cryptos from portfolio, two api calls are needed.
 * @param {string} token - required to succeed in api call.
 * @param {string} cryptoId - crypto's name.
 * @param {callback} callback -returns api's answer.
 */
function deletePortfolioCrypto(token, cryptoId, callback) {
    String.validate.notVoid(token)
    String.validate.notVoid(cryptoId)
    Function.validate(callback)

    const url = 'https://skylabcoders.herokuapp.com/api/v2/users/'
    let body = undefined
    let headers = { 'Authorization': `Bearer ${token}` }

    call('GET', url, body, headers, (error, status, response) => {
        if (error) return callback(error)

        if (status === 200) {
            let { portfolio = [] } = JSON.parse(response)

            portfolio = portfolio.filter(item => item.id !== cryptoId)

            body = JSON.stringify({ portfolio })
            headers = { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }


            call('PATCH', url, body, headers, (error, status, response) => {

                if (error) return callback(error)

                if (status === 204) return callback()

                const { error: apiError } = JSON.parse(response)
                callback(new Error(apiError))
            })
        } else {
            const { error: apiError } = JSON.parse(response)
            callback(new Error(apiError))
        }
    })

}

/**
 * @callback callback - this function is inside deletePortfolioCrypto, returns api'answer.
 * @param {string} error - returns api's error when exists.
 */