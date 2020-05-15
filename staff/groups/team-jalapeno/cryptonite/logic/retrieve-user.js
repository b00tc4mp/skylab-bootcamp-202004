 /**
  * Gets user's info after an api's call.
  * @param {string} token -required to api's call succeeds.
  * @param {callback} callback - handles api's answer.
  */
function retrieveUser(token, callback) {
    String.validate.notVoid(token)
    Function.validate(callback)
 
    const url = 'https://skylabcoders.herokuapp.com/api/v2/users/'
    const body = undefined
    const headers =  { 'Authorization': `Bearer ${token}` }

    call('GET', url, body, headers, (error, status, response) => {
        if (error) return callback(error)

        if (status === 200) {
            const { name, surname, username, favorites = [], portfolio = [] } = JSON.parse(response)
            return callback(undefined, { name, surname, email: username, favorites, portfolio })
        }
        
        const { error: apiError } = JSON.parse(response)
        callback(new Error(apiError))
    })
}

/**
 * this function is inside retrieveUser function.
 * @callback callback
 * @param {string} error - api's answer when an error exists.
 * @param {object[data]} data - api's answer when succeeds
 * @param {string} data[].name - answer from api
 * @param {string} data[].surname - answer from api
 * @param {email} data[].username - answer from api
 * @param {object[]} data[].favorites - answer from api
 * @param {objectg[]} data[].portfolio - answer from api
 */