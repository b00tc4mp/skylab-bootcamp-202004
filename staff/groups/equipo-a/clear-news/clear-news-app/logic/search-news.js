function searchNews(token, query, language, sortBy, callback) {

    String.validate.notVoid(query);
    Function.validate(callback);

    // let numberOfNews

    let allNews = []

    const numberOfPages = []

    const NEWS_FOR_PAGE = 20

    // switch (counter) {
    //     case 0: numberOfNews = 20
    //         break;
    //     case 1: numberOfNews = 40
    //         break;
    //     case 2: numberOfNews = 60
    //         break;
    //     case 3: numberOfNews = 80
    //         break;
    //     case 4: numberOfNews = 100
    //         break;
    //     default: numberOfNews = 20
    //         break;
    // }
    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        { 'Authorization': `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                let user = JSON.parse(body)

                const { favorite = [] } = user

                //Confirmar el número de noticias por búsqueda

                call('GET', `https://newsapi.org/v2/everything?q=${query}&language=${language}&sortBy=${sortBy}&pageSize=40&apiKey=f8ed27ae05b44313b6a87abfea6dc48b`,
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
