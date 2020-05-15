/**
 * @function addPortfolioCrypto - adds coin id and quantity to user's portfolio. Needs two api's calls.
 * @param {string} token - required to get user's info(response) from api.
 * @param {object[]} portfolioInfo - object that contains array with ids and quantitys, can be empty.
 * @param {string} portfolioInfo[].id - coin in portfolio's id.
 * @param {number} portfolioInfo[].quantity - quantity of coins for  a portfolioInfo.id
 * @param {callback} callback - returns answers from api
 */

function addPortfolioCrypto(token, portfolioInfo, callback) {

    String.validate.notVoid(token)
    Function.validate(callback)


    const url = 'https://skylabcoders.herokuapp.com/api/v2/users/'
    let body = undefined
    let headers = { 'Authorization': `Bearer ${token}` }

    call('GET', url, body, headers, (error, status, response) => {
        if (error) return callback(error)

        if (status === 200) {
            let { portfolio = [] } = JSON.parse(response)

            let portfolioAlreadyExists = portfolio.find(item => item.id === portfolioInfo.id)

            if (portfolioAlreadyExists) {
                portfolio = portfolio.map(item => {
                    if (item.id === portfolioInfo.id) {
                        item.quantity += portfolioInfo.quantity
                    }
                    return item
                })

            } else portfolio.push(portfolioInfo)


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
 * @callback callback - this function is inside addPortfolioCrypto. Returns answer from api.
 * @param {string} error - error api's response.
 */