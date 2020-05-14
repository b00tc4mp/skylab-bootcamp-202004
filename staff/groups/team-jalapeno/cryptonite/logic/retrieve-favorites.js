/**
 * @function retrieveFavorites - Returns favorites  Id' from the user's data in a API.
 * @param {favoritesIds} favoritesIds - array of favorites Id's from the API data.
 * @param {callback} callback - returns the  API's data or errors.  
 */

function retrieveFavorites(callback, favoritesIds) {
    Function.validate(callback)
   // if (typeof favoritesIds !== 'array') throw new Error(favoritesIds + 'is not valid')

    const url = `https://api.coincap.io/v2/assets?&ids=${favoritesIds.join(',')}`
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
 * callback is a function inside retrieveFavorites that returns  API's response.
 * @callback callback 
 * @param {object[]} data -  destructured from response from api.
 * @param {string} error - error from api.
 */