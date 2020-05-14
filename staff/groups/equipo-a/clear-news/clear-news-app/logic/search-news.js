
/**
  * Retrieve favorites news. 
  * 
  * @param {string} token Users token
  * @param {string} query Users input query
  * @param {string} languaje Users selected languaje
  * @param {string} sortBy Users selectedorder to sort the articles. (relevancy, popularity,...)
  * 
  * @param {function} callback The expression to be called after checking credentials, will recieve an Error or authentication token.
  *
  * @throws {TypeError} If any of the parameters does not match the corresponding type or if callback is not a function.
  * @throws {Error} If there is no token.
  */
function searchNews(token, query, language, sortBy, callback) {

    String.validate.notVoid(token);
    String.validate.notVoid(query);
    String.validate(query);
    Function.validate(callback);

    let allNews = []

    const numberOfPages = []

    const NEWS_FOR_PAGE = 20


    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        { 'Authorization': `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                const user = JSON.parse(body);

                const { favorite = [] } = user

                call('GET', `https://newsapi.org/v2/everything?q=${query}&language=${language}&sortBy=${sortBy}&pageSize=40&apiKey=0d80af4c6ef6473aae5bb15fcf9eb625`,

                    undefined,
                    undefined,
                    (error, status, body) => {
                        if (error) return callback(error);

                        if (status === 200) {
                            const { articles } = JSON.parse(body);

                            for (let i in articles) {
                                const { source, author, title, description, url, urlToImage, publishedAt } = articles[i]

                                if (typeof source !== "undefined") {
                                    const { name } = source
                                    allNews.push({ name, author, title, description, url, urlToImage, publishedAt })

                                }
                                else {
                                    const name = "unknown"
                                    allNews.push({ name, author, title, description, url, urlToImage, publishedAt })
                                }

                            }

                            allNews = allNews.map(({ name, author, title, description, url, urlToImage, publishedAt }) => {
                                const _news = { name, author, title, description, url, urlToImage, publishedAt }
                                _news.favorites = favorite.includes(title)
                                return _news
                            })

                        } else {
                            const { error } = JSON.parse(body);

                            callback(new Error(error));
                        }

                        for(let i = 0; i < Math.ceil(allNews.length/NEWS_FOR_PAGE); i++){
                            numberOfPages.push(i+1)
                        }

                        const allNewsUnique = getUnique(allNews, element=>element.title)

                        callback(undefined, allNewsUnique, numberOfPages);
                    });
            }else {
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
 * @param {Array} myNews Array of objects with the news
 * @param {Number} numberOfPages numbers of pages in news
 */