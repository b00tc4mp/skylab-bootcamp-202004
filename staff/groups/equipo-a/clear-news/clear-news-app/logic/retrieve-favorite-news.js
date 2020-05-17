/**
  * Retrieve favorites news. 
  * 
  * @param {string} token Users token
  * 
  * @param {function} callback The expression to be called after checking credentials, will recieve an Error or authentication token.
  *
  * @throws {TypeError} If any of the parameters does not match the corresponding type or if callback is not a function.
  * @throws {Error} If there is no token.
  */

function retrieveFavNews(token, callback) {
    String.validate.notVoid(token);

    Function.validate(callback);

    const favNews = [];

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        { 'Authorization': `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {

                const user = JSON.parse(body);

                const { favorite = [], headlines=[] } = user

                let counter = 0
                debugger
                for (let i in headlines){
                    const index = favorite.indexOf(headlines[i].title)
                    index !== -1 ? favorite.splice(index, 1) : favorite
                }

                favorite.forEach((item => {

                    call('GET', `https://newsapi.org/v2/everything?q=${item}&apiKey=0d80af4c6ef6473aae5bb15fcf9eb625`,

                        undefined,
                        undefined,
                        (error, status, body) => {
                            if (error) return callback(error)

                            if (status === 200) {
                                counter++
                                const news = JSON.parse(body)

                                const { articles } = news

                                for (let i in articles) {
                                    const { source, author, title, description, url, urlToImage, publishedAt } = articles[i]
                                    if(title === item){
                                    if (typeof source !== "undefined") {
                                        const { name } = source
                                        favNews.push({ name, author, title, description, url, urlToImage, publishedAt })
                                    }
                                    else {
                                        const name = "unknown"
                                        favNews.push({ name, author, title, description, url, urlToImage, publishedAt })
                                    }
                                }
                                }

                            } else {
                                const { error } = JSON.parse(body)
                                callback(new Error(error))
                            }

                            
                            
                            if (counter === favorite.length) {
                                let favNewsUnique = getUnique(favNews, element=>element.title)
                                callback(undefined, favNewsUnique)
                            }
                        })
                }))
            } else {
                const { error } = JSON.parse(body)
                callback(new Error(error))
            }

        })
}

/**
 *
 *
 * @callback callback
 * @param {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * @param {Array} favNews Array of objects with a users favorite news.
 */