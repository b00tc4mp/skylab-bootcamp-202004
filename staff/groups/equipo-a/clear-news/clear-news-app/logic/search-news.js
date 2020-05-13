function searchNews(token, query, language, sortBy, callback) {

    String.validate.notVoid(query);
    String.validate(query);
    String.validate.notVoid(token);
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
                let user = JSON.parse(body)

                const { favorite = [] } = user

                call('GET', `https://newsapi.org/v2/everything?q=${query}&language=${language}&sortBy=${sortBy}&pageSize=40&apiKey=55aab6760184405791eeffefcbd32733`,

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

                        callback(undefined, allNews, numberOfPages);
                    });
            }else {
                const { error } = JSON.parse(body)
                callback(new Error(error))
            }

        })
}
