/**
 * Save/delete a favorite headlines
 * 
 * @param {string} token Users input token for authentication
 * @param {object} headline Users categories/interest
 * @param {function} callback The expression to be called for return an error in case of an asynchronous error or complete asynchronous function if no error happens
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding format
 * @throws {Error} If token passed is empty or blank.
 */

function storeTopHeadlines(token, headline, callback) {
    String.validate.notVoid(token)
    if (typeof headline !== 'object') throw new TypeError(`${headline} is not an object`)
    Function.validate(callback)

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
        { 'Authorization': `Bearer ${token}` },
        (error, status, body) => {

            if (error) return callback(error);

            if (status === 200) {
                const user = JSON.parse(body);
                if (!user.headlines) user.headlines = []
                if (!user.favorite) user.favorite = []

                let newsTitle = []
                for (let i in user.headlines) {
                    newsTitle.push(user.headlines[i].title);
                }

                let toIndex = newsTitle.indexOf(headline.title);
                if (toIndex === -1) {
                    user.headlines.push(headline);
                } else if (toIndex !== -1) {
                    user.headlines.splice(toIndex, 1);
                }

                let favIndex = user.favorite.indexOf(headline.title)
                if (toIndex === -1) {
                    user.favorite.push(headline.title);
                } else if (favIndex !== -1) {
                    user.favorite.splice(favIndex, 1);
                }

                call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', JSON.stringify(user),
                    { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` },
                    (error, status, body) => {
                        if (error) return callback(error)

                        if (status === 204) {
                            callback()
                        } else {
                            const { error } = JSON.parse(body)
                            callback(new Error(error))
                        }

                    })
            } else {
                const { error } = JSON.parse(body)
                callback(new Error(error))
            }
        })
}

/**
 * Invoked after remote authentication.
 *
 * @callback callback
 * @param {Error} error It may receive an error in case remote logic fails or there is a network problem.
 */