/**
 * Retrieve news headlines stored in the user array
 * 
 * @param {string} token User token
 * @param {function} callback The expression to be called after checking credentials, will recieve an Error or array with news headlines.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type or if callback is not a function.
 * @throws {Error} If does not match the expected format.
 */

function retrieveFavoriteTopHeadlines(token, callback) {
    String.validate.notVoid(token);

    Function.validate(callback);

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        { 'Authorization': `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                let user = JSON.parse(body)

                const { headlines = [] } = user

                callback(undefined, headlines)

            } else {
                const { error } = JSON.parse(body)
                callback(new Error(error))
            }
        }

    )
}

/**
 * Invoked after remote authentication.
 * 
 * @callback callback
 * @param {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * @param {Array} headlines Array of objects with the news
 */